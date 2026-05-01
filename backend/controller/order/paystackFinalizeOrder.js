const mongoose = require('mongoose');
const orderModel = require('../../models/orderProductModel');
const checkoutModel = require('../../models/checkoutModel');
const addToCartModel = require('../../models/cartProduct');
const UserModel = require('../../models/userModel');
const {
    sendPaymentSuccessEmail,
    sendPaymentSuccessNotificationToAdmin,
    sendUserOrderConfirmationEmail,
    sendOrderNotificationEmail,
    getAdminRecipientsFromEnv,
} = require('../../mailtrap/emails');
const { paystackVerifyTransaction } = require('../../lib/paystack');

const PAYSTACK_METHOD_DEFAULT = 'Paystack';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Merge flat metadata plus Paystack custom_fields; parse metadata if JSON string.
 */
function normalizePaystackMetadata(txnData) {
    const merged = {};
    let raw = txnData?.metadata;

    if (typeof raw === 'string') {
        try {
            raw = JSON.parse(raw);
        } catch (_e) {
            raw = {};
        }
    }

    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        Object.assign(merged, raw);
    }

    const fields = raw?.custom_fields;
    if (Array.isArray(fields)) {
        for (const f of fields) {
            if (
                f &&
                typeof f.variable_name === 'string' &&
                f.variable_name.trim() !== '' &&
                f.value !== undefined &&
                f.value !== null
            ) {
                const vn = f.variable_name.trim();
                merged[vn] = merged[vn] ?? f.value;
            }
        }
    }

    return merged;
}

function pickValidObjectId(...candidates) {
    for (const c of candidates) {
        if (c == null || c === '') continue;
        const s = String(c).trim();
        if (mongoose.isValidObjectId(s)) return s;
    }
    return undefined;
}

function sanitizeCartLines(items) {
    if (!Array.isArray(items)) return [];
    const out = [];
    for (const item of items) {
        const pid = item?.productId;
        if (!pid || !mongoose.isValidObjectId(String(pid))) continue;
        out.push({
            productId: String(pid),
            quantity: Math.max(1, Math.floor(Number(item.quantity)) || 1),
            ...(item.price != null && !Number.isNaN(Number(item.price))
                ? { price: Number(item.price) }
                : {}),
        });
    }
    return out;
}

/** Browser /success: fewer Paystack polls so the shopper is not staring at a spinner for 30s+. */
/** Webhook/reconcile/slow infra: tolerate Paystack propagation delay before verify returns success. */
const VERIFY_PROFILES = {
    quick: {
        maxAttempts: 5,
        waitAfterFailMs: (attempt) => Math.min(520, 50 + attempt * 95),
    },
    thorough: {
        maxAttempts: 10,
        waitAfterFailMs: (attempt) => Math.min(2500, 320 + attempt * 380),
    },
};

async function verifyPaystackTransactionWithRetry(reference, profile = 'thorough') {
    const cfg = VERIFY_PROFILES[profile] || VERIFY_PROFILES.thorough;
    let last = null;

    for (let attempt = 0; attempt < cfg.maxAttempts; attempt++) {
        last = await paystackVerifyTransaction(reference);
        if (last?.status === true && last?.data?.status === 'success') return last;

        if (attempt < cfg.maxAttempts - 1) await sleep(cfg.waitAfterFailMs(attempt));
    }
    return last;
}

function paystackPaymentLabel(data) {
    const channel = data?.channel;
    if (!channel || channel === 'card') return PAYSTACK_METHOD_DEFAULT;
    return `Paystack (${channel})`;
}

async function sendFulfillmentEmails({
    savedCheckout,
    cartItemsLen,
    channelData,
    amountNgn,
    forceResend = false,
}) {
    if (!forceResend && savedCheckout?.paymentFulfillmentEmailsSentAt) {
        console.log('[Paystack finalize] Skipping fulfillment emails (already sent):', savedCheckout._id);
        return;
    }

    let customerEmail = channelData.customer?.email;
    if (!customerEmail && savedCheckout?.userId) {
        const u = await UserModel.findById(savedCheckout.userId).select('email');
        customerEmail = u?.email;
    }

    const pm =
        savedCheckout.paymentMethod ||
        paystackPaymentLabel(
            typeof channelData.channel !== 'undefined' ? channelData : { channel: 'card' }
        );

    const userId = savedCheckout.userId;
    const paymentData = {
        transactionId: channelData.reference || savedCheckout.paymentDetails?.paymentId,
        paymentMethod: pm,
        amount: amountNgn,
        paymentDate: new Date().toLocaleString(),
        orderId: savedCheckout._id,
        customerEmail,
        itemCount: cartItemsLen,
    };

    if (userId) {
        const user = await UserModel.findById(userId);
        if (user?.email) {
            try {
                await sendPaymentSuccessEmail(user.email, paymentData);
            } catch (e) {
                console.error('[Paystack finalize] sendPaymentSuccessEmail:', e);
            }
            try {
                await sendUserOrderConfirmationEmail(user.email, savedCheckout);
            } catch (e) {
                console.error('[Paystack finalize] sendUserOrderConfirmationEmail:', e);
            }
        }
    }

    let adminNotified = false;

    try {
        await sendPaymentSuccessNotificationToAdmin(paymentData);
        adminNotified = true;
    } catch (e) {
        console.error('[Paystack finalize] sendPaymentSuccessNotificationToAdmin:', e);
    }

    let adminRecipients = getAdminRecipientsFromEnv();
    if (adminRecipients.length === 0) adminRecipients = ['ronniesfabrics05@gmail.com'];

    try {
        await sendOrderNotificationEmail(adminRecipients, {
            name: savedCheckout.name,
            number: savedCheckout.number,
            address: savedCheckout.address,
            note: savedCheckout.note || 'N/A',
            paymentMethod: pm,
            total: `₦${savedCheckout.totalPrice}`,
            cartItems: savedCheckout.cartItems,
        });
        adminNotified = true;
    } catch (e) {
        console.error('[Paystack finalize] sendOrderNotificationEmail:', e);
    }

    if (adminNotified && savedCheckout?._id) {
        try {
            await checkoutModel.updateOne(
                { _id: savedCheckout._id },
                { $set: { paymentFulfillmentEmailsSentAt: new Date() } }
            );
        } catch (e) {
            console.error('[Paystack finalize] Could not mark paymentFulfillmentEmailsSentAt:', e);
        }
    }
}

/**
 * Looks up checkout by Paystack reference; verifies with Paystack if missing and creates checkout + legacy order row.
 *
 * @param {string} reference
 * @param {string|undefined} requestUserId - JWT user id fallback when metadata has no user
 * @param {{ resendEmailsForExisting?: boolean, verifyProfile?: 'quick' | 'thorough' }} options
 */
async function finalizePaystackByReference(reference, requestUserId, options = {}) {
    const { resendEmailsForExisting = false, verifyProfile = 'thorough' } = options;

    const existingCheckout = await checkoutModel.findOne({
        'paymentDetails.paymentId': reference,
    });

    if (existingCheckout) {
        if (resendEmailsForExisting) {
            console.log('[Paystack finalize] Duplicate reference, resending emails:', reference);
            try {
                await sendFulfillmentEmails({
                    savedCheckout: existingCheckout,
                    cartItemsLen: existingCheckout.cartItems?.length || 0,
                    channelData: {
                        reference,
                        channel: existingCheckout.paymentDetails?.payment_method_type,
                        customer: {},
                    },
                    amountNgn: existingCheckout.totalPrice,
                    forceResend: true,
                });
            } catch (e) {
                console.error('[Paystack finalize] Email error (existing checkout):', e);
            }
        }
        return {
            ok: true,
            statusCode: 200,
            alreadyExists: true,
            message: resendEmailsForExisting
                ? 'Order already processed — notifications sent.'
                : 'Order already exists for this Paystack reference.',
            data: existingCheckout,
        };
    }

    const verifyJson = await verifyPaystackTransactionWithRetry(reference, verifyProfile);

    const ok = verifyJson?.status === true && verifyJson?.data?.status === 'success';
    if (!ok) {
        console.warn('[Paystack finalize] Verify failed for reference:', reference, {
            message: verifyJson?.message,
            dataStatus: verifyJson?.data?.status,
        });
        return {
            ok: false,
            statusCode: 400,
            message: verifyJson?.message || 'Payment verification failed (not successful on Paystack).',
        };
    }

    const data = verifyJson.data;
    const meta = normalizePaystackMetadata(data);

    let cartItemsForCheckout = [];
    const cartSrc = meta.cartItems;
    if (typeof cartSrc === 'string' && cartSrc.trim()) {
        try {
            const parsedCartItems = JSON.parse(cartSrc);
            cartItemsForCheckout = sanitizeCartLines(parsedCartItems);
        } catch (err) {
            console.error('Error parsing cartItems string:', err);
        }
    } else if (Array.isArray(cartSrc)) {
        cartItemsForCheckout = sanitizeCartLines(cartSrc);
    }

    const amountNgn = data.amount / 100;
    const resolvedUserId = pickValidObjectId(
        meta.user_id,
        meta.userId,
        requestUserId
    );

    let resolvedName =
        typeof meta.name === 'string' && meta.name.trim() ? meta.name.trim() : '';
    if (
        !resolvedName &&
        (data.customer?.first_name != null ||
            data.customer?.last_name != null)
    ) {
        resolvedName = `${data.customer.first_name || ''} ${data.customer.last_name || ''}`.trim();
    }
    if (!resolvedName && data.customer?.email) {
        resolvedName = data.customer.email.split('@')[0];
    }

    const checkoutData = {
        name: resolvedName,
        number: meta.number || '',
        address: meta.address || 'N/A',
        note: meta.note || '',
        cartItems: cartItemsForCheckout,
        totalPrice: amountNgn,
        paymentMethod: paystackPaymentLabel(data),
        status: 'Processing',
        userId: resolvedUserId,
        paymentDetails: {
            paymentId: data.reference,
            payment_method_type: data.channel || 'card',
            payment_status: data.status || 'success',
        },
    };

    if (!checkoutData.name && data.customer?.email) {
        checkoutData.name = data.customer.email.split('@')[0];
    }

    const extraWarnings = [];
    let savedCheckout;

    try {
        savedCheckout = await new checkoutModel(checkoutData).save();
    } catch (saveErr) {
        console.error(
            '[Paystack finalize] Checkout save failed, retrying with empty cart/no user:',
            saveErr.message || saveErr
        );
        checkoutData.cartItems = [];
        cartItemsForCheckout = [];
        checkoutData.userId = undefined;
        extraWarnings.push(
            'Checkout had invalid cart or user linkage; saved totals only — reconcile line items manually if needed.'
        );
        try {
            savedCheckout = await new checkoutModel(checkoutData).save();
        } catch (e2) {
            console.error('[Paystack finalize] Second save failed:', e2.message || e2);
            return {
                ok: false,
                statusCode: 500,
                message: 'Could not save order after payment (database validation error).',
            };
        }
    }

    const orderDetails = {
        productDetails: cartItemsForCheckout,
        email: data.customer?.email || meta.email || '',
        userId: String(resolvedUserId || ''),
        paymentDetails: checkoutData.paymentDetails,
        shipping_options: [],
        totalAmount: amountNgn,
    };

    try {
        await new orderModel(orderDetails).save();
    } catch (orderErr) {
        console.error('[Paystack finalize] Legacy orderProduct save failed:', orderErr.message || orderErr);
        extraWarnings.push('Checkout created but mirrored order row could not be saved.');
    }

    if (savedCheckout?._id && resolvedUserId) {
        await addToCartModel.deleteMany({ userId: resolvedUserId });
    }

    console.log('[Paystack finalize] New checkout created:', savedCheckout._id, reference);

    try {
        await sendFulfillmentEmails({
            savedCheckout,
            cartItemsLen: cartItemsForCheckout.length,
            channelData: data,
            amountNgn,
        });
    } catch (emailError) {
        console.error('[Paystack finalize] Email error:', emailError);
    }

    const warnings = [...extraWarnings];
    if (!cartItemsForCheckout.length && !extraWarnings.some((w) => w.includes('totals only'))) {
        warnings.push(
            'No line items in Paystack metadata — order amount is preserved; edit or verify in admin if needed.'
        );
    }

    return {
        ok: true,
        statusCode: 200,
        alreadyExists: false,
        message: 'Order reconciled successfully.',
        data: savedCheckout,
        warnings,
    };
}

module.exports = {
    finalizePaystackByReference,
    paystackPaymentLabel,
    PAYSTACK_METHOD_DEFAULT,
    VERIFY_PROFILES,
};
