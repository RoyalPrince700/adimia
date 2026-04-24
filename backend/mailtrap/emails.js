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

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Adimia World</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 24px 0;text-align:center;">
              <span style="font-size:20px;font-weight:700;letter-spacing:-0.04em;color:#0f172a;">Adimia World</span>
              <div style="height:3px;width:64px;background-color:#f59e0b;margin:10px auto 0;border-radius:999px;"></div>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(15,23,42,0.08);">
              <div style="padding:32px 28px 28px 28px;">
                <p style="margin:0 0 8px 0;color:#64748b;font-size:12px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;">Welcome</p>
                <h1 style="margin:0 0 8px 0;font-size:22px;font-weight:700;letter-spacing:-0.03em;color:#0f172a;">We&apos;re glad you&apos;re here</h1>
                <p style="margin:0 0 20px 0;font-size:16px;font-weight:600;color:#0f172a;">${personalizedGreeting}</p>
                <p style="margin:0 0 16px 0;font-size:15px;line-height:1.65;color:#475569;">Thank you for joining the Adimia World community&mdash;we&apos;re thrilled to have you with us.</p>
                <p style="margin:0 0 10px 0;font-size:14px;font-weight:600;color:#0f172a;">Get started</p>
                <ul style="margin:0 0 20px 0;padding:0 0 0 20px;font-size:15px;line-height:1.7;color:#475569;">
                  <li style="margin-bottom:8px;"><strong style="color:#0f172a;">Browse the catalog</strong> &mdash; discover products curated for you</li>
                  <li style="margin-bottom:8px;"><strong style="color:#0f172a;">Shop by category</strong> &mdash; find what you need quickly</li>
                  <li style="margin-bottom:8px;"><strong style="color:#0f172a;">Track orders</strong> &mdash; updates on purchases and delivery</li>
                  <li style="margin-bottom:0;"><strong style="color:#0f172a;">Your account</strong> &mdash; profile and order history</li>
                </ul>
                <div style="text-align:center;margin:28px 0 24px 0;">
                  <a href="${frontendUrl}" style="display:inline-block;padding:14px 28px;background-color:#0f172a;color:#ffffff;text-decoration:none;border-radius:9999px;font-weight:600;font-size:15px;box-shadow:0 10px 30px rgba(15,23,42,0.12);">Start exploring</a>
                </div>
                <p style="margin:0 0 20px 0;font-size:15px;line-height:1.65;color:#475569;">Questions? Our support team is here to help.</p>
                <p style="margin:0;font-size:15px;line-height:1.65;color:#475569;">Welcome aboard,<br><span style="color:#0f172a;font-weight:600;">The Adimia World Team</span></p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 8px 0 8px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#64748b;">This is an automated welcome message from Adimia World. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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

// Admin order notification
const sendOrderNotificationEmail = async (recipients, payload) => {
    const cell = (html, align = 'left', extra = '') =>
        `<td align="${align}" style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155;vertical-align:middle;${extra}">${html}</td>`;
    const itemsRows = (payload.cartItems || [])
        .map((it) => {
            const productObj = it?.productId || {};
            const id = productObj?._id || it?.productId;
            const name = it?.name || productObj?.productName || productObj?.name || 'Item';
            const qty = it?.quantity || 1;
            const price = productObj?.sellingPrice || it?.price || '';
            const base = getFrontendUrl().replace(/\/$/, '');
            const url = id ? `${base}/product/${id}` : '';
            const priceText = price !== '' ? `₦${price}` : '—';
            const link = url
                ? `<a href="${url}" style="color:#d97706;font-weight:600;text-decoration:none;">View</a>`
                : '—';
            return `<tr>${cell(
                name
            )}${cell(
                String(qty),
                'center'
            )}${cell(
                priceText,
                'right'
            )}${cell(link)}</tr>`;
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
    const oCell = (html, align = 'left') =>
        `<td align="${align}" style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#334155;vertical-align:middle;">${html}</td>`;
    const itemsRows = (payload.cartItems || [])
        .map((it) => {
            const productObj = it?.productId || {};
            const name = it?.name || productObj?.productName || productObj?.name || 'Item';
            const qty = it?.quantity || 1;
            const price = productObj?.sellingPrice || it?.price || '';
            const priceText = price !== '' ? `₦${price}` : '—';
            const lineDisplay =
                price !== '' ? `₦${Number(price) * qty}` : '—';
            return `<tr>${oCell(name)}${oCell(String(qty), 'center')}${oCell(priceText, 'right')}${oCell(
                lineDisplay,
                'right'
            )}</tr>`;
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
      <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">Order</p>
      <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Order ID:</strong> ${paymentData.orderId}</p>
      <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Items:</strong> ${
        paymentData.itemCount || 'Multiple items'
      }</p>
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
      <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">Order</p>
      <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Order ID:</strong> ${paymentData.orderId}</p>
      <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Customer email:</strong> ${
        paymentData.customerEmail || 'N/A'
      }</p>
      <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Items:</strong> ${
        paymentData.itemCount || 'Multiple items'
      }</p>
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
    const getStatusBadgeHtml = (status) => {
        const styles = {
            Pending: { bg: '#fef3c7', color: '#92400e' },
            Processing: { bg: '#e0e7ff', color: '#3730a3' },
            Shipped: { bg: '#d1fae5', color: '#065f46' },
            Delivered: { bg: '#0f172a', color: '#ffffff' },
            Cancelled: { bg: '#fee2e2', color: '#991b1b' }
        };
        const s = styles[status] || styles.Pending;
        return `<span style="display:inline-block;margin-left:8px;padding:6px 14px;border-radius:999px;font-weight:600;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;background-color:${s.bg};color:${s.color};">${status}</span>`;
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
        .replace('{statusHtml}', getStatusBadgeHtml(orderData.status))
        .replace('{nextSteps}', getNextSteps(orderData.status))
        .replace('{frontendUrl}', getFrontendUrl().replace(/\/$/, ''));

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
