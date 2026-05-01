const checkoutModel = require('../../models/checkoutModel');
const UserModel = require('../../models/userModel');
const {
    sendPaymentSuccessEmail,
    sendPaymentSuccessNotificationToAdmin,
    sendUserOrderConfirmationEmail,
    sendOrderNotificationEmail,
    getAdminRecipientsFromEnv,
} = require('../../mailtrap/emails');
const { finalizePaystackByReference } = require('./paystackFinalizeOrder');

const PAYSTACK_METHOD_DEFAULT = 'Paystack';

const verifyPaymentController = async (request, response) => {
    try {
        const reference = request.body.reference || request.body.transaction_id;

        if (!reference) {
            return response.status(400).json({
                message: 'Payment reference is required',
                success: false,
                error: true,
            });
        }

        const existingCheckout = await checkoutModel.findOne({
            'paymentDetails.paymentId': reference,
        });

        // Success page: send emails once per checkout (webhook may have sent already)
        if (existingCheckout) {
            console.log('[SUCCESS PAGE] Existing checkout:', reference);
            if (!existingCheckout.paymentFulfillmentEmailsSentAt) {
                try {
                    const userId = existingCheckout.userId;
                    const paymentData = {
                        transactionId: reference,
                        paymentMethod: existingCheckout.paymentMethod || PAYSTACK_METHOD_DEFAULT,
                        amount: existingCheckout.totalPrice,
                        paymentDate:
                            existingCheckout.createdAt?.toLocaleString() ||
                            new Date().toLocaleString(),
                        orderId: existingCheckout._id,
                        customerEmail: null,
                        itemCount: existingCheckout.cartItems?.length || 0,
                    };

                    if (userId) {
                        const user = await UserModel.findById(userId);
                        if (user?.email) {
                            paymentData.customerEmail = user.email;
                            try {
                                await sendPaymentSuccessEmail(user.email, paymentData);
                            } catch (e) {
                                console.error('[SUCCESS PAGE] sendPaymentSuccessEmail:', e);
                            }
                            try {
                                await sendUserOrderConfirmationEmail(user.email, existingCheckout);
                            } catch (e) {
                                console.error('[SUCCESS PAGE] sendUserOrderConfirmationEmail:', e);
                            }
                        }
                    }

                    let adminNotified = false;

                    try {
                        await sendPaymentSuccessNotificationToAdmin(paymentData);
                        adminNotified = true;
                    } catch (e) {
                        console.error('[SUCCESS PAGE] sendPaymentSuccessNotificationToAdmin:', e);
                    }

                    let adminRecipients = getAdminRecipientsFromEnv();
                    if (adminRecipients.length === 0) adminRecipients = ['ronniesfabrics05@gmail.com'];

                    try {
                        await sendOrderNotificationEmail(adminRecipients, {
                            name: existingCheckout.name,
                            number: existingCheckout.number,
                            address: existingCheckout.address,
                            note: existingCheckout.note || 'N/A',
                            paymentMethod: existingCheckout.paymentMethod || PAYSTACK_METHOD_DEFAULT,
                            total: `₦${existingCheckout.totalPrice}`,
                            cartItems: existingCheckout.cartItems,
                        });
                        adminNotified = true;
                    } catch (e) {
                        console.error('[SUCCESS PAGE] sendOrderNotificationEmail:', e);
                    }

                    if (adminNotified && existingCheckout._id) {
                        try {
                            await checkoutModel.updateOne(
                                { _id: existingCheckout._id },
                                { $set: { paymentFulfillmentEmailsSentAt: new Date() } }
                            );
                        } catch (e) {
                            console.error('[SUCCESS PAGE] Could not mark paymentFulfillmentEmailsSentAt:', e);
                        }
                    }
                } catch (emailError) {
                    console.error('[SUCCESS PAGE] Email error:', emailError);
                }
            } else {
                console.log('[SUCCESS PAGE] Emails already sent for this checkout; skipping.');
            }

            return response.json({
                message: 'Order already processed — emails sent',
                success: true,
                data: existingCheckout,
            });
        }

        const result = await finalizePaystackByReference(reference, request.userId, {
            resendEmailsForExisting: false,
            verifyProfile: 'quick',
        });

        if (!result.ok) {
            return response.status(result.statusCode).json({
                success: false,
                message: result.message,
                error: true,
                ...(result.warnings?.length ? { warnings: result.warnings } : {}),
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Order placed successfully',
            data: result.data,
            ...(result.warnings?.length ? { warnings: result.warnings } : {}),
        });
    } catch (error) {
        console.error('Verify Payment Error:', error);
        response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = verifyPaymentController;
