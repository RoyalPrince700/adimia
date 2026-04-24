const { transporter, sender } = require('./mailtrap.config');
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, ORDER_NOTIFICATION_TEMPLATE, ORDER_CONFIRMATION_EMAIL_TEMPLATE, PAYMENT_SUCCESS_EMAIL_TEMPLATE, ORDER_STATUS_UPDATE_EMAIL_TEMPLATE } = require('./emailTemplates');

const { getFrontendBaseUrl } = require('../config/envUrls.js');

// Utility function to get the correct frontend URL
const getFrontendUrl = () => {
    return getFrontendBaseUrl() || '';
};

const logMailSend = (tag, mailOptions) => {
    try {
        console.log(`[MAIL] -> ${tag}`, {
            from: mailOptions?.from,
            to: mailOptions?.to,
            subject: mailOptions?.subject,
        });
    } catch (e) {
        // ignore
    }
};

const logMailResult = (tag, response) => {
    try {
        console.log(`[MAIL] <- ${tag}`, {
            messageId: response?.messageId,
            accepted: response?.accepted,
            rejected: response?.rejected,
            response: response?.response,
        });
    } catch (e) {
        // ignore
    }
};

const logMailError = (tag, error) => {
    console.error(`[MAIL] !! ${tag} failed`, {
        message: error?.message,
        code: error?.code,
        command: error?.command,
        response: error?.response,
        responseCode: error?.responseCode,
        stack: error?.stack,
    });
};

const sendVerificationEmail = async (email, token) => {
    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Verify your email address",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
        };

        logMailSend('verification email', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('verification email', response);
        return response;
    } catch (error) {
        logMailError('verification email', error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};

const sendWelcomeEmail = async (email, name = 'there') => {
    try {
        const personalizedGreeting = name !== 'there' ? `Hi ${name}!` : 'Hello there!';
        const frontendUrl = getFrontendUrl();

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Adimia World!</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
    .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(to right, #10B981, #059669); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0; margin: -30px -30px 20px -30px; }
    .welcome-icon { font-size: 48px; color: #10B981; text-align: center; margin: 10px 0; }
    .cta-button { display: inline-block; padding: 12px 24px; background-color: #10B981; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; color: #6B7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="welcome-icon">🎉</div>
      <h1>Welcome to Adimia World!</h1>
      <p>Your journey to great products starts here</p>
    </div>

    <h2>${personalizedGreeting}</h2>

    <p>Thank you for joining the Adimia World community! We're thrilled to have you with us.</p>

    <p>Here's what you can do to get started:</p>

    <ul>
      <li><strong>Browse our catalog</strong> - Discover products curated for you</li>
      <li><strong>Shop by category</strong> - Find what you need quickly</li>
      <li><strong>Track your orders</strong> - Real-time updates on your purchases and shipping status</li>
      <li><strong>Manage your account</strong> - Update your profile and view your order history</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${frontendUrl}" class="cta-button">Start Exploring</a>
    </div>

    <p>If you have any questions, feel free to reach out to our support team. We're here to help!</p>

    <p>Welcome aboard,<br>The Adimia World Team</p>
  </div>

  <div class="footer">
    <p>This is an automated welcome message from Adimia World. Please do not reply to this email.</p>
  </div>
</body>
</html>`;

        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "🎉 Welcome to Adimia World - start shopping!",
            html,
        };

        logMailSend('welcome email', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('welcome email', response);
        return response;
    } catch (error) {
        logMailError('welcome email', error);
        throw new Error(`Error sending welcome email: ${error.message}`);
    }
}

const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        };

        logMailSend('password reset email', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('password reset email', response);
        return response;
    } catch (error) {
        logMailError('password reset email', error);
        throw new Error(`Error sending password reset email: ${error.message}`);
    }
}

const sendResetSuccessfulEmail = async (email) => {
    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        };

        logMailSend('password reset success email', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('password reset success email', response);
        return response;
    } catch (error) {
        logMailError('password reset success email', error);
        throw new Error(`Error sending password reset successful email: ${error}`);
    }
}

module.exports = { sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessfulEmail};

// Admin order notification
const sendOrderNotificationEmail = async (recipients, payload) => {
    const itemsRows = (payload.cartItems || [])
        .map((it) => {
            const productObj = it?.productId || {};
            const id = productObj?._id || it?.productId;
            const name = it?.name || productObj?.productName || productObj?.name || 'Item';
            const qty = it?.quantity || 1;
            const price = productObj?.sellingPrice || it?.price || '';
            const base = getFrontendUrl().replace(/\/$/, '');
            const url = id ? `${base}/product/${id}` : '';
            const priceText = price !== '' ? price : '';
            return `<tr><td>${name}</td><td>${qty}</td><td>${priceText}</td><td>${url ? `<a href="${url}">View</a>` : ''}</td></tr>`;
        })
        .join('');

    const html = ORDER_NOTIFICATION_TEMPLATE
        .replace('{name}', payload.name)
        .replace('{number}', payload.number)
        .replace('{address}', payload.address)
        .replace('{note}', payload.note || 'N/A')
        .replace('{paymentMethod}', payload.paymentMethod || 'Pay on Delivery')
        .replace('{total}', payload.total)
        .replace('{itemsRows}', itemsRows);

    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: Array.isArray(recipients) ? recipients.join(', ') : recipients,
            subject: `New Order from ${payload.name}`,
            html,
        };

        logMailSend('admin order notification', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('admin order notification', response);
        return response;
    } catch (error) {
        logMailError('admin order notification', error);
        // Throw so callers can log/report; callers already catch so it won't block user flow
        throw error;
    }
};

// User order confirmation email
const sendUserOrderConfirmationEmail = async (userEmail, payload) => {
    const itemsRows = (payload.cartItems || [])
        .map((it) => {
            const productObj = it?.productId || {};
            const name = it?.name || productObj?.productName || productObj?.name || 'Item';
            const qty = it?.quantity || 1;
            const price = productObj?.sellingPrice || it?.price || '';
            const priceText = price !== '' ? `₦${price}` : '';
            const totalPrice = price * qty;
            return `<tr><td>${name}</td><td>${qty}</td><td>${priceText}</td><td>₦${totalPrice}</td></tr>`;
        })
        .join('');

    const html = ORDER_CONFIRMATION_EMAIL_TEMPLATE
        .replace('{name}', payload.name)
        .replace('{orderId}', payload._id)
        .replace('{address}', payload.address)
        .replace('{note}', payload.note || 'N/A')
        .replace('{paymentMethod}', payload.paymentMethod || 'Pay on Delivery')
        .replace('{total}', `₦${payload.totalPrice}`)
        .replace('{itemsRows}', itemsRows);

    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: userEmail,
            subject: "Order Confirmation - Adimia World",
            html,
        };

        logMailSend('user order confirmation', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('user order confirmation', response);
        return response;
    } catch (error) {
        logMailError('user order confirmation', error);
        // Throw so callers can log/report; callers already catch so it won't block user flow
        throw error;
    }
};

// User payment success email
const sendPaymentSuccessEmail = async (userEmail, paymentData) => {
    const orderDetails = paymentData.orderId ? `
      <h4>Order Information</h4>
      <p><strong>Order ID:</strong> ${paymentData.orderId}</p>
      <p><strong>Items:</strong> ${paymentData.itemCount || 'Multiple items'}</p>
    ` : '';

    const html = PAYMENT_SUCCESS_EMAIL_TEMPLATE
        .replace('{transactionId}', paymentData.transactionId)
        .replace('{paymentMethod}', paymentData.paymentMethod)
        .replace('{amount}', paymentData.amount)
        .replace('{paymentDate}', paymentData.paymentDate)
        .replace('{orderDetails}', orderDetails);

    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: userEmail,
            subject: "Payment Successful - Adimia World",
            html,
        };

        logMailSend('user payment success', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('user payment success', response);
        return response;
    } catch (error) {
        logMailError('user payment success', error);
        throw error;
    }
};

// Admin payment success notification
const sendPaymentSuccessNotificationToAdmin = async (paymentData) => {
    const adminRecipients = [];
    if (process.env.ADMINEMAIL1) adminRecipients.push(process.env.ADMINEMAIL1);
    if (process.env.ADMINEMAIL2) adminRecipients.push(process.env.ADMINEMAIL2);
    if (process.env.ADMIN_NOTIFICATION_EMAIL && !adminRecipients.includes(process.env.ADMIN_NOTIFICATION_EMAIL)) {
        adminRecipients.push(process.env.ADMIN_NOTIFICATION_EMAIL);
    }

    if (adminRecipients.length === 0) {
        console.warn('[MAIL] No admin recipients for payment notification. Set ADMINEMAIL1, ADMINEMAIL2, or ADMIN_NOTIFICATION_EMAIL.');
        return;
    }

    const orderDetails = paymentData.orderId ? `
      <h4>Order Information</h4>
      <p><strong>Order ID:</strong> ${paymentData.orderId}</p>
      <p><strong>Customer Email:</strong> ${paymentData.customerEmail || 'N/A'}</p>
      <p><strong>Items:</strong> ${paymentData.itemCount || 'Multiple items'}</p>
    ` : '';

    const html = PAYMENT_SUCCESS_EMAIL_TEMPLATE
        .replace('{transactionId}', paymentData.transactionId)
        .replace('{paymentMethod}', paymentData.paymentMethod)
        .replace('{amount}', paymentData.amount)
        .replace('{paymentDate}', paymentData.paymentDate)
        .replace('{orderDetails}', orderDetails);

    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: adminRecipients.join(', '),
            subject: `New Payment Received - ₦${paymentData.amount} | Adimia World`,
            html,
        };

        logMailSend('admin payment success', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('admin payment success', response);
        return response;
    } catch (error) {
        logMailError('admin payment success', error);
        throw error;
    }
};

// Order Status Update Email
const sendOrderStatusUpdateEmail = async (userEmail, orderData) => {
    const getStatusClass = (status) => {
        const statusClasses = {
            'Pending': 'pending',
            'Processing': 'processing',
            'Shipped': 'shipped',
            'Delivered': 'delivered',
            'Cancelled': 'cancelled'
        };
        return statusClasses[status] || 'pending';
    };

    const getNextSteps = (status) => {
        const steps = {
            'Pending': '<p>Your order has been received and is awaiting processing. We will update you once it starts being prepared.</p>',
            'Processing': '<p>Your order is currently being prepared. Our team is working to get it ready for shipment.</p>',
            'Shipped': '<p>Great news! Your order has been shipped and is on its way to you. You will receive tracking information soon.</p>',
            'Delivered': '<p>Your order has been successfully delivered! We hope you enjoy your purchase.</p>',
            'Cancelled': '<p>Your order has been cancelled. If you have any questions, please contact our support team.</p>'
        };
        return steps[status] || '<p>Your order status has been updated. Please check your account for more details.</p>';
    };

    const html = ORDER_STATUS_UPDATE_EMAIL_TEMPLATE
        .replace('{orderId}', orderData.orderId)
        .replace('{orderDate}', orderData.orderDate)
        .replace('{status}', orderData.status)
        .replace('{statusClass}', getStatusClass(orderData.status))
        .replace('{nextSteps}', getNextSteps(orderData.status))
        .replace('{frontendUrl}', getFrontendUrl());

    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: userEmail,
            subject: `Order Status Update - ${orderData.status} | Adimia World`,
            html,
        };

        logMailSend('order status update', mailOptions);
        const response = await transporter.sendMail(mailOptions);
        logMailResult('order status update', response);
        return response;
    } catch (error) {
        logMailError('order status update', error);
        throw error;
    }
};

module.exports = {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessfulEmail,
    sendOrderNotificationEmail,
    sendUserOrderConfirmationEmail,
    sendPaymentSuccessEmail,
    sendPaymentSuccessNotificationToAdmin,
    sendOrderStatusUpdateEmail
};
