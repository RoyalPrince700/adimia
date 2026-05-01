require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const key = process.env.PAYSTACK_SECRET_KEY;
if (!key) {
  console.error('PAYSTACK_SECRET_KEY is not set in backend/.env');
  process.exit(1);
}

const mode = key.startsWith('sk_test_')
  ? 'test'
  : key.startsWith('sk_live_')
    ? 'live'
    : 'unknown (expected sk_test_… or sk_live_…)';

fetch('https://api.paystack.co/bank?country=nigeria&perPage=1', {
  headers: { Authorization: `Bearer ${key}` },
})
  .then((res) => res.json())
  .then((body) => {
    if (body.status === true) {
      console.log('Paystack accepted the secret key.');
      console.log('Key mode:', mode);
      process.exit(0);
    }
    console.error('Paystack API error:', body.message || JSON.stringify(body));
    process.exit(1);
  })
  .catch((err) => {
    console.error('Network/request error:', err.message);
    process.exit(1);
  });
