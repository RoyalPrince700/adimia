const orderModel = require('../../models/orderProductModel');
const checkoutModel = require('../../models/checkoutModel');
const addToCartModel = require('../../models/cartProduct');
const UserModel = require('../../models/userModel');
const {
    sendPaymentSuccessEmail,
    sendPaymentSuccessNotificationToAdmin,
    sendUserOrderConfirmationEmail,
    sendOrderNotificationEmail,
} = require('../../mailtrap/emails');
const { paystackVerifyTransaction } = require('../../lib/paystack');

const PAYSTACK_METHOD_DEFAULT = 'Paystack';

function paystackPaymentLabel(data) {
    const channel = data?.channel;
    if (!channel || channel === 'card') return PAYSTACK_METHOD_DEFAULT;
    return `Paystack (${channel})`;
}

async function sendFulfillmentEmails({ savedCheckout, cartItemsLen, channelData, amountNgn }) {
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
            await sendPaymentSuccessEmail(user.email, paymentData);
            await sendUserOrderConfirmationEmail(user.email, savedCheckout);
        }
    }

    await sendPaymentSuccessNotificationToAdmin(paymentData);

    const adminRecipients = [];
    if (process.env.ADMINEMAIL1) adminRecipients.push(process.env.ADMINEMAIL1);
    if (process.env.ADMINEMAIL2) adminRecipients.push(process.env.ADMINEMAIL2);
    if (
        process.env.ADMIN_NOTIFICATION_EMAIL &&
        !adminRecipients.includes(process.env.ADMIN_NOTIFICATION_EMAIL)
    ) {
        adminRecipients.push(process.env.ADMIN_NOTIFICATION_EMAIL);
    }
    if (adminRecipients.length === 0) adminRecipients.push('ronniesfabrics05@gmail.com');

    await sendOrderNotificationEmail(adminRecipients, {
        name: savedCheckout.name,
        number: savedCheckout.number,
        address: savedCheckout.address,
        note: savedCheckout.note || 'N/A',
        paymentMethod: pm,
        total: `₦${savedCheckout.totalPrice}`,
        cartItems: savedCheckout.cartItems,
    });
}

/**
 * Looks up checkout by Paystack reference; verifies with Paystack if missing and creates checkout + legacy order row.
 *
 * @param {string} reference
 * @param {string|undefined} requestUserId - JWT user id fallback when metadata has no user
 * @param {{ resendEmailsForExisting?: boolean }} options Success-page flow resends mails on duplicate admin reconcile does not
 */
async function finalizePaystackByReference(reference, requestUserId, options = {}) {
    const { resendEmailsForExisting = false } = options;

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

    const verifyJson = await paystackVerifyTransaction(reference);

    const ok = verifyJson.status === true && verifyJson.data?.status === 'success';
    if (!ok) {
        return {
            ok: false,
            statusCode: 400,
            message: verifyJson.message || 'Payment verification failed (not successful on Paystack).',
        };
    }

    const data = verifyJson.data;
    const meta = data.metadata || {};

    let cartItemsForCheckout = [];
    if (meta.cartItems) {
        try {
            const parsedCartItems = JSON.parse(meta.cartItems);
            cartItemsForCheckout = parsedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                ...(item.price != null ? { price: item.price } : {}),
            }));
        } catch (err) {
            console.error('Error parsing cartItems:', err);
        }
    }

    const amountNgn = data.amount / 100;
    const resolvedUserId = meta.user_id || meta.userId || requestUserId;

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

    const newCheckout = new checkoutModel(checkoutData);
    const savedCheckout = await newCheckout.save();

    const orderDetails = {
        productDetails: cartItemsForCheckout,
        email: data.customer?.email || meta.email || '',
        userId: String(resolvedUserId || ''),
        paymentDetails: checkoutData.paymentDetails,
        shipping_options: [],
        totalAmount: amountNgn,
    };

    await new orderModel(orderDetails).save();

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

    const warnings = [];
    if (cartItemsForCheckout.length === 0) {
        warnings.push('No line items in Paystack metadata — order amount is preserved; edit order in Paystack/email if needed.');
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
};
