/**
 * Sends the real app welcome email using production Mailtrap/SMTP settings from .env
 * (MAILTRAP_PROD_HOST, MAILTRAP_PROD_PORT, MAILTRAP_PROD_USER, MAILTRAP_PROD_PASS, etc.)
 *
 * Usage (from backend folder):
 *   node scripts/test-welcome-prod.js
 *   node scripts/test-welcome-prod.js you@example.com
 *   node scripts/test-welcome-prod.js you@example.com "Your Name"
 */
process.env.NODE_ENV = 'production';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { sendWelcomeEmail } = require('../mailtrap/emails');

const DEFAULT_TO = 'finetex700@gmail.com';

async function main() {
  const to = process.argv[2] || DEFAULT_TO;
  const name = process.argv[3] || 'Test';

  console.log('[test-welcome-prod] Sending welcome email (prod SMTP from .env)...', { to, name });

  try {
    const res = await sendWelcomeEmail(to, name);
    console.log('[test-welcome-prod] OK', {
      messageId: res?.messageId,
      accepted: res?.accepted,
    });
    setTimeout(() => process.exit(0), 500);
  } catch (err) {
    console.error('[test-welcome-prod] FAILED', err?.message || err);
    process.exit(1);
  }
}

main();
