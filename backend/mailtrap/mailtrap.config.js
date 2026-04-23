const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables - search in current and parent dirs
dotenv.config();
dotenv.config({ path: '../.env' });

const isProd = process.env.NODE_ENV === 'production';

// Production SMTP configuration
// Mailtrap Sending: host is usually 'send.smtp.mailtrap.io' or 'live.smtp.mailtrap.io'
// Port options: 587 (TLS), 465 (SSL), 2525 (Alternative TLS)
const host = process.env.MAILTRAP_PROD_HOST || 'live.smtp.mailtrap.io';
const port = parseInt(process.env.MAILTRAP_PROD_PORT) || 2525; // Defaulting to 2525 as it's often more reliable on cloud providers
const user = process.env.MAILTRAP_PROD_USER;
const pass = process.env.MAILTRAP_PROD_PASS;

const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
        user,
        pass,
    },
    // Increased connection timeout for cloud provider reliability
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000,
    socketTimeout: 30000,
});

// Use either MAILTRAP_FROM_EMAIL or MAILTRAP_FROM
const fromEmail = process.env.MAILTRAP_FROM_EMAIL || process.env.MAILTRAP_FROM || "noreply@ronniesfabrics.com";

// Log mail configuration summary (safe, no secrets)
try {
    console.log('[MAIL] Config loaded:', {
        NODE_ENV: process.env.NODE_ENV,
        isProd,
        host,
        port,
        userSet: !!user,
        passSet: !!pass,
        fromEmail,
        adminNotificationEmailSet: !!process.env.ADMIN_NOTIFICATION_EMAIL,
        adminEmail1Set: !!process.env.ADMINEMAIL1,
        adminEmail2Set: !!process.env.ADMINEMAIL2,
    });
} catch (e) {
    // ignore logging failures
}

// Verify the connection on startup (non-blocking)
if (user && pass) {
    transporter.verify((error, success) => {
        if (error) {
            console.error('[MAIL] SMTP verify failed:', {
                message: error?.message,
                code: error?.code,
                command: error?.command,
                response: error?.response,
            });
        } else {
            console.log('[MAIL] SMTP verify OK:', { success: !!success, host, port });
        }
    });
} else {
    console.error('[MAIL] SMTP credentials missing. Emails will fail to send.', {
        MAILTRAP_PROD_USER_set: !!user,
        MAILTRAP_PROD_PASS_set: !!pass,
        MAILTRAP_PROD_HOST: host,
        MAILTRAP_PROD_PORT: port,
    });
}

const sender = {
    email: fromEmail,
    name: "Ronniesfabrics",
};

module.exports = { transporter, sender };
