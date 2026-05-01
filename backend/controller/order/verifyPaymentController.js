const checkoutModel = require('../../models/checkoutModel');
const UserModel = require('../../models/userModel');
const {
    sendPaymentSuccessEmail,
    sendPaymentSuccessNotificationToAdmin,
    sendUserOrderConfirmationEmail,
    sendOrderNotificationEmail,
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

        // Success page: reuse prior behaviour — resend emails when customer hits /success again
        if (existingCheckout) {
            console.log('[SUCCESS PAGE] Existing checkout:', reference);
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
                        await sendPaymentSuccessEmail(user.email, paymentData);
                        await sendUserOrderConfirmationEmail(user.email, existingCheckout);
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
                    name: existingCheckout.name,
                    number: existingCheckout.number,
                    address: existingCheckout.address,
                    note: existingCheckout.note || 'N/A',
                    paymentMethod: existingCheckout.paymentMethod || PAYSTACK_METHOD_DEFAULT,
                    total: `₦${existingCheckout.totalPrice}`,
                    cartItems: existingCheckout.cartItems,
                });
            } catch (emailError) {
                console.error('[SUCCESS PAGE] Email error:', emailError);
            }

            return response.json({
                message: 'Order already processed — emails sent',
                success: true,
                data: existingCheckout,
            });
        }

        const result = await finalizePaystackByReference(reference, request.userId, {
            resendEmailsForExisting: false,
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
