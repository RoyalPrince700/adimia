const { validatePaystackWebhookSignature } = require('../../lib/paystack')

/**
 * Confirms Paystack pushed an event. Order creation runs in verifyPaymentController
 * when the customer returns to /success (avoids duplicate orders vs success-page verify).
 * Configure the same URL in your Paystack dashboard (e.g. https://api.yoursite.com/api/webhook).
 */
const webhooks = async (request, response) => {
    const signature = request.headers['x-paystack-signature']
    const rawBody = request.paystackRawBody

    if (!validatePaystackWebhookSignature(rawBody, signature)) {
        response.status(401).send('Unauthorized')
        return
    }

    const payload = request.body

    if (payload.event === 'charge.success') {
        console.log(
            '[Paystack webhook] charge.success reference:',
            payload.data?.reference
        )
    }

    response.status(200).json({
        success: true,
        message: 'Webhook received',
    })
}

module.exports = webhooks
