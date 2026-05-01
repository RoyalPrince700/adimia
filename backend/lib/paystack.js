const crypto = require('crypto');

const PAYSTACK_SECRET_KEY = () => process.env.PAYSTACK_SECRET_KEY;

async function paystackInitialize(body) {
  const secret = PAYSTACK_SECRET_KEY();
  if (!secret) throw new Error('PAYSTACK_SECRET_KEY is not configured');

  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function paystackVerifyTransaction(reference) {
  const secret = PAYSTACK_SECRET_KEY();
  if (!secret) throw new Error('PAYSTACK_SECRET_KEY is not configured');

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secret}` },
    }
  );
  return res.json();
}

function validatePaystackWebhookSignature(rawBodyBuffer, signatureHeader) {
  const secret = PAYSTACK_SECRET_KEY();
  if (!secret || !signatureHeader || !rawBodyBuffer || !Buffer.isBuffer(rawBodyBuffer)) {
    return false;
  }
  const hash = crypto.createHmac('sha512', secret).update(rawBodyBuffer).digest('hex');
  return hash === signatureHeader;
}

module.exports = {
  paystackInitialize,
  paystackVerifyTransaction,
  validatePaystackWebhookSignature,
};
