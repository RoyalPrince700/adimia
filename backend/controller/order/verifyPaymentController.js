const orderModel = require('../../models/orderProductModel');
const checkoutModel = require('../../models/checkoutModel');
const addToCartModel = require('../../models/cartProduct');
const UserModel = require('../../models/userModel');
const { sendPaymentSuccessEmail, sendPaymentSuccessNotificationToAdmin, sendUserOrderConfirmationEmail, sendOrderNotificationEmail } = require('../../mailtrap/emails');
const { paystackVerifyTransaction } = require('../../lib/paystack');

const PAYSTACK_METHOD_DEFAULT = 'Paystack';

function paystackPaymentLabel(data) {
    const channel = data?.channel;
    if (!channel || channel === 'card') return PAYSTACK_METHOD_DEFAULT;
    return `Paystack (${channel})`;
}

const verifyPaymentController = async (request, response) => {
    try {
        const reference = request.body.reference || request.body.transaction_id;

        if (!reference) {
            return response.status(400).json({
                message: 'Payment reference is required',
                success: false,
                error: true
            });
        }

        const existingCheckout = await checkoutModel.findOne({ "paymentDetails.paymentId": reference });
        if (existingCheckout) {
            console.log('[SUCCESS PAGE] 🔄 Existing checkout found, sending emails for transaction:', reference);
            try {
                const userId = existingCheckout.userId;
                const paymentData = {
                    transactionId: reference,
                    paymentMethod: existingCheckout.paymentMethod || PAYSTACK_METHOD_DEFAULT,
                    amount: existingCheckout.totalPrice,
                    paymentDate: existingCheckout.createdAt?.toLocaleString() || new Date().toLocaleString(),
                    orderId: existingCheckout._id,
                    customerEmail: null,
                    itemCount: existingCheckout.cartItems?.length || 0
                };

                if (userId) {
                    const user = await UserModel.findById(userId);
                    if (user && user.email) {
                        paymentData.customerEmail = user.email;
                        await sendPaymentSuccessEmail(user.email, paymentData);
                        await sendUserOrderConfirmationEmail(user.email, existingCheckout);
                    }
                }

                await sendPaymentSuccessNotificationToAdmin(paymentData);

                const adminRecipients = [];
                if (process.env.ADMINEMAIL1) adminRecipients.push(process.env.ADMINEMAIL1);
                if (process.env.ADMINEMAIL2) adminRecipients.push(process.env.ADMINEMAIL2);
                if (process.env.ADMIN_NOTIFICATION_EMAIL && !adminRecipients.includes(process.env.ADMIN_NOTIFICATION_EMAIL)) {
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
                    cartItems: existingCheckout.cartItems
                });

            } catch (emailError) {
                console.error('[SUCCESS PAGE] ❌ Error sending payment success emails for existing checkout:', emailError);
            }

            return response.json({
                message: "Order already processed - emails sent",
                success: true,
                data: existingCheckout
            });
        }

        const verifyJson = await paystackVerifyTransaction(reference);

        const ok =
            verifyJson.status === true &&
            verifyJson.data?.status === 'success';

        if (!ok) {
            return response.status(400).json({
                success: false,
                message: verifyJson.message || 'Payment verification failed'
            });
        }

        const data = verifyJson.data;
        const meta = data.metadata || {};

        let cartItemsForCheckout = [];
        if (meta.cartItems) {
            try {
                const parsedCartItems = JSON.parse(meta.cartItems);
                cartItemsForCheckout = parsedCartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    ...(item.price != null ? { price: item.price } : {})
                }));
            } catch (err) {
                console.error('Error parsing cartItems:', err);
            }
        }

        const amountNgn = data.amount / 100;

        const resolvedUserId = meta.user_id || meta.userId || request.userId;

        const checkoutData = {
            name: meta.name || '',
            number: meta.number || '',
            address: meta.address || 'N/A',
            note: meta.note || '',
            cartItems: cartItemsForCheckout,
            totalPrice: amountNgn,
            paymentMethod: paystackPaymentLabel(data),
            status: 'Paid',
            userId: resolvedUserId,
            paymentDetails: {
                paymentId: data.reference,
                payment_method_type: data.channel || 'card',
                payment_status: data.status || 'success',
            }
        };

        const newCheckout = new checkoutModel(checkoutData);
        const savedCheckout = await newCheckout.save();

        const orderDetails = {
            productDetails: cartItemsForCheckout,
            email: data.customer?.email || meta.email || '',
            userId: String(resolvedUserId || ''),
            paymentDetails: checkoutData.paymentDetails,
            shipping_options: [],
            totalAmount: amountNgn
        };

        const order = new orderModel(orderDetails);
        await order.save();

        if (savedCheckout?._id && resolvedUserId) {
            await addToCartModel.deleteMany({ userId: resolvedUserId });
        }

        console.log('[PRODUCTION SUCCESS PAGE] 🚀 Starting email sends for NEW order');
        try {
            const userId = resolvedUserId;
            const paymentData = {
                transactionId: data.reference,
                paymentMethod: paystackPaymentLabel(data),
                amount: amountNgn,
                paymentDate: new Date().toLocaleString(),
                orderId: savedCheckout._id,
                customerEmail: data.customer?.email,
                itemCount: cartItemsForCheckout.length
            };

            if (userId) {
                const user = await UserModel.findById(userId);
                if (user && user.email) {
                    await sendPaymentSuccessEmail(user.email, paymentData);
                    await sendUserOrderConfirmationEmail(user.email, savedCheckout);
                }
            }

            await sendPaymentSuccessNotificationToAdmin(paymentData);

            const adminRecipients = [];
            if (process.env.ADMINEMAIL1) adminRecipients.push(process.env.ADMINEMAIL1);
            if (process.env.ADMINEMAIL2) adminRecipients.push(process.env.ADMINEMAIL2);
            if (process.env.ADMIN_NOTIFICATION_EMAIL && !adminRecipients.includes(process.env.ADMIN_NOTIFICATION_EMAIL)) {
                adminRecipients.push(process.env.ADMIN_NOTIFICATION_EMAIL);
            }
            if (adminRecipients.length === 0) adminRecipients.push('ronniesfabrics05@gmail.com');

            await sendOrderNotificationEmail(adminRecipients, {
                name: savedCheckout.name,
                number: savedCheckout.number,
                address: savedCheckout.address,
                note: savedCheckout.note || 'N/A',
                paymentMethod: paystackPaymentLabel(data),
                total: `₦${savedCheckout.totalPrice}`,
                cartItems: savedCheckout.cartItems
            });

        } catch (emailError) {
            console.error('[SUCCESS PAGE] ❌ Error sending payment success emails:', emailError);
        }

        return response.status(200).json({
            success: true,
            message: 'Order placed successfully',
            data: savedCheckout
        });

    } catch (error) {
        console.error('Verify Payment Error:', error);
        response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = verifyPaymentController;
