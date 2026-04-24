/**
 * HTML email styles aligned with the storefront (Cart, ProductDetails, ProductGridCard):
 * slate neutrals, soft card shadows, rounded-2xl feel, amber accent — table layout for client support.
 */

const outerOpen = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>`;

const outerMid = `</title>
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
            <td style="background-color:#ffffff;border:1px solid #e2e8f0;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(15,23,42,0.08);">`;

const outerClose = `
            </td>
          </tr>
          <tr>
            <td style="padding:24px 8px 0 8px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#64748b;">This is an automated message from Adimia World. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const contentPadding = 'padding:32px 28px 28px 28px;';
const pBase = 'margin:0 0 16px 0;font-size:15px;line-height:1.65;color:#475569;';
const h1 = 'margin:0 0 8px 0;font-size:22px;font-weight:700;letter-spacing:-0.03em;color:#0f172a;';
const muted = 'color:#64748b;font-size:12px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;';

const VERIFICATION_EMAIL_TEMPLATE = `${outerOpen}Verify Your Email${outerMid}
              <div style="${contentPadding}">
                <p style="${muted}margin-bottom:8px;">Account</p>
                <h1 style="${h1}">Verify your email</h1>
                <p style="${pBase}">Thank you for signing up! Your verification code is:</p>
                <div style="text-align:center;margin:28px 0;padding:20px 16px;background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;">
                  <span style="font-size:32px;font-weight:700;letter-spacing:0.3em;color:#0f172a;">{verificationCode}</span>
                </div>
                <p style="${pBase}">Enter this code on the verification page to complete your registration.</p>
                <p style="${pBase}">This code will expire in 15 minutes for security reasons.</p>
                <p style="${pBase}">If you didn&apos;t create an account with us, you can ignore this email.</p>
                <p style="margin:24px 0 0 0;font-size:15px;line-height:1.65;color:#475569;">Best regards,<br><span style="color:#0f172a;font-weight:600;">The Adimia World Team</span></p>
              </div>
${outerClose}`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `${outerOpen}Password Reset Successful${outerMid}
              <div style="${contentPadding}">
                <p style="${muted}margin-bottom:8px;">Security</p>
                <h1 style="${h1}">Password updated</h1>
                <p style="${pBase}">We&apos;re writing to confirm that your password has been successfully reset.</p>
                <div style="text-align:center;margin:28px 0;">
                  <div style="display:inline-block;width:56px;height:56px;line-height:56px;border-radius:50%;background-color:#0f172a;color:#ffffff;font-size:28px;font-weight:700;">&#10003;</div>
                </div>
                <p style="${pBase}">If you did not initiate this password reset, please contact our support team immediately.</p>
                <p style="${pBase}">Thank you for helping us keep your account secure.</p>
                <p style="margin:24px 0 0 0;font-size:15px;line-height:1.65;color:#475569;">Best regards,<br><span style="color:#0f172a;font-weight:600;">The Adimia World Team</span></p>
              </div>
${outerClose}`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `${outerOpen}Reset Your Password${outerMid}
              <div style="${contentPadding}">
                <p style="${muted}margin-bottom:8px;">Security</p>
                <h1 style="${h1}">Reset your password</h1>
                <p style="${pBase}">We received a request to reset your password. If you didn&apos;t make this request, you can ignore this email.</p>
                <p style="${pBase}">To set a new password, use the button below.</p>
                <div style="text-align:center;margin:28px 0;">
                  <a href="{resetURL}" style="display:inline-block;padding:14px 28px;background-color:#0f172a;color:#ffffff;text-decoration:none;border-radius:9999px;font-weight:600;font-size:15px;box-shadow:0 10px 30px rgba(15,23,42,0.12);">Reset password</a>
                </div>
                <p style="${pBase}">This link will expire in 1 hour for security reasons.</p>
                <p style="margin:24px 0 0 0;font-size:15px;line-height:1.65;color:#475569;">Best regards,<br><span style="color:#0f172a;font-weight:600;">The Adimia World Team</span></p>
              </div>
${outerClose}`;

const ORDER_CONFIRMATION_EMAIL_TEMPLATE = `${outerOpen}Order Confirmation${outerMid}
              <div style="${contentPadding}">
                <p style="${muted}margin-bottom:8px;">Order</p>
                <h1 style="${h1}">Order confirmed</h1>
                <p style="margin:0 0 20px 0;font-size:16px;color:#0f172a;">Thank you for your order, <strong style="color:#0f172a;">{name}</strong>.</p>
                <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 18px;margin:0 0 20px 0;">
                  <h2 style="margin:0 0 14px 0;font-size:14px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Order details</h2>
                  <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Order ID:</strong> {orderId}</p>
                  <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Delivery address:</strong> {address}</p>
                  <p style="margin:0 0 10px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Payment method:</strong> {paymentMethod}</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Note:</strong> {note}</p>
                </div>
                <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Items ordered</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin:0 0 16px 0;">
                  <thead>
                    <tr>
                      <th align="left" style="padding:12px 14px;background-color:#f1f5f9;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;">Product</th>
                      <th align="center" style="padding:12px 10px;background-color:#f1f5f9;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;">Qty</th>
                      <th align="right" style="padding:12px 14px;background-color:#f1f5f9;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;">Unit</th>
                      <th align="right" style="padding:12px 14px;background-color:#f1f5f9;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsRows}
                  </tbody>
                </table>
                <div style="text-align:right;padding:12px 0 0 0;border-top:1px solid #e2e8f0;">
                  <p style="margin:0;font-size:18px;font-weight:700;letter-spacing:-0.02em;color:#0f172a;">Total: {total}</p>
                </div>
                <p style="margin:20px 0 0 0;${pBase}">We&apos;ll process your order shortly and keep you updated on delivery.</p>
                <p style="${pBase}">Questions? Reach out to our support team anytime.</p>
                <p style="margin:24px 0 0 0;font-size:15px;line-height:1.65;color:#475569;">Best regards,<br><span style="color:#0f172a;font-weight:600;">The Adimia World Team</span></p>
              </div>
${outerClose}`;

const PAYMENT_SUCCESS_EMAIL_TEMPLATE = `${outerOpen}Payment Successful${outerMid}
              <div style="${contentPadding}">
                <p style="${muted}margin-bottom:8px;">Payment</p>
                <div style="text-align:center;margin-bottom:12px;">
                  <div style="display:inline-block;width:56px;height:56px;line-height:56px;border-radius:16px;background-color:#ecfdf3;color:#059669;font-size:28px;font-weight:700;">&#10003;</div>
                </div>
                <h1 style="${h1}text-align:center;">Payment received</h1>
                <p style="margin:0 0 20px 0;font-size:15px;line-height:1.65;color:#475569;text-align:center;">Your payment was processed successfully.</p>
                <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #10b981;border-radius:12px;padding:20px 18px;margin:0 0 20px 0;">
                  <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Payment details</h2>
                  <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Transaction ID:</strong> {transactionId}</p>
                  <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Payment method:</strong> {paymentMethod}</p>
                  <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Amount paid:</strong> <span style="font-size:18px;font-weight:700;color:#047857;">&#8358;{amount}</span></p>
                  <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Date:</strong> {paymentDate}</p>
                  {orderDetails}
                  <p style="margin:0;font-size:14px;color:#047857;font-weight:600;">Status: completed</p>
                </div>
                <p style="${pBase}">Thank you! Your order is now being processed. You&apos;ll get updates by email as things move along.</p>
                <p style="margin:24px 0 0 0;font-size:15px;line-height:1.65;color:#475569;">Best regards,<br><span style="color:#0f172a;font-weight:600;">The Adimia World Team</span></p>
              </div>
${outerClose}`;

const ORDER_NOTIFICATION_TEMPLATE = `${outerOpen}New Order${outerMid}
              <div style="${contentPadding}">
                <p style="${muted}margin-bottom:8px;">Admin</p>
                <h1 style="${h1}">New order placed</h1>
                <p style="${pBase}">A customer just submitted an order. Details below.</p>
                <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 18px;margin:0 0 20px 0;">
                  <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Customer</h2>
                  <p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">
                    <strong style="color:#0f172a;">Name:</strong> {name}<br/>
                    <strong style="color:#0f172a;">Phone:</strong> {number}<br/>
                    <strong style="color:#0f172a;">Address:</strong> {address}<br/>
                    <strong style="color:#0f172a;">Note:</strong> {note}
                  </p>
                </div>
                <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Items</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin:0 0 16px 0;">
                  <thead>
                    <tr>
                      <th align="left" style="padding:12px 14px;background-color:#f1f5f9;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;">Product</th>
                      <th align="center" style="padding:12px 10px;background-color:#f1f5f9;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;">Qty</th>
                      <th align="right" style="padding:12px 14px;background-color:#f1f5f9;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;">Price</th>
                      <th align="left" style="padding:12px 14px;background-color:#f1f5f9;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsRows}
                  </tbody>
                </table>
                <p style="margin:0;font-size:15px;line-height:1.65;color:#0f172a;">
                  <strong>Payment method:</strong> {paymentMethod}<br/>
                  <strong>Total:</strong> {total}
                </p>
                <p style="margin:20px 0 0 0;font-size:12px;color:#94a3b8;">This message was sent automatically by the Adimia World backend.</p>
              </div>
${outerClose}`;

const ORDER_STATUS_UPDATE_EMAIL_TEMPLATE = `${outerOpen}Order Status${outerMid}
              <div style="${contentPadding}">
                <p style="${muted}margin-bottom:8px;">Orders</p>
                <h1 style="${h1}">Order status update</h1>
                <p style="margin:0 0 20px 0;font-size:15px;line-height:1.65;color:#475569;">Your order status has changed. Here&apos;s the latest.</p>
                <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #f59e0b;border-radius:12px;padding:20px 18px;margin:0 0 20px 0;">
                  <h2 style="margin:0 0 12px 0;font-size:14px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">Order information</h2>
                  <p style="margin:0 0 8px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Order ID:</strong> {orderId}</p>
                  <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;color:#475569;"><strong style="color:#0f172a;">Order date:</strong> {orderDate}</p>
                  <p style="margin:0;font-size:14px;color:#475569;">
                    <strong style="color:#0f172a;">Status:</strong>
                    {statusHtml}
                  </p>
                </div>
                <div style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:20px 18px;margin:0 0 24px 0;">
                  <h2 style="margin:0 0 10px 0;font-size:15px;font-weight:600;color:#0f172a;">What&apos;s next?</h2>
                  <div style="font-size:14px;line-height:1.65;color:#475569;">{nextSteps}</div>
                </div>
                <p style="${pBase}">You can track your order and see updates in your account.</p>
                <div style="text-align:center;margin:24px 0;">
                  <a href="{frontendUrl}/order" style="display:inline-block;padding:14px 28px;background-color:#0f172a;color:#ffffff;text-decoration:none;border-radius:9999px;font-weight:600;font-size:15px;box-shadow:0 10px 30px rgba(15,23,42,0.12);">View my orders</a>
                </div>
                <p style="${pBase}">If you have any questions, our support team is here to help.</p>
                <p style="margin:24px 0 0 0;font-size:15px;line-height:1.65;color:#475569;">Best regards,<br><span style="color:#0f172a;font-weight:600;">The Adimia World Team</span></p>
                <p style="margin:20px 0 0 0;padding-top:16px;border-top:1px solid #e2e8f0;font-size:13px;color:#64748b;">Need help? <a href="mailto:support@adimiaworld.com" style="color:#d97706;font-weight:600;text-decoration:none;">support@adimiaworld.com</a></p>
              </div>
${outerClose}`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  ORDER_NOTIFICATION_TEMPLATE,
  ORDER_CONFIRMATION_EMAIL_TEMPLATE,
  PAYMENT_SUCCESS_EMAIL_TEMPLATE,
  ORDER_STATUS_UPDATE_EMAIL_TEMPLATE
};
