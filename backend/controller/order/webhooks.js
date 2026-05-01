const { validatePaystackWebhookSignature } = require('../../lib/paystack')
const { finalizePaystackByReference } = require('./paystackFinalizeOrder')

function normalizeWebhookMeta(raw) {
    if (raw == null) return {};
    let m = raw;
    if (typeof m === 'string') {
        try {
            m = JSON.parse(m);
        } catch {
            return {};
        }
    }
    if (!m || typeof m !== 'object' || Array.isArray(m)) return {};
    const out = { ...m };
    if (Array.isArray(m.custom_fields)) {
        for (const f of m.custom_fields) {
            if (f?.variable_name) {
                out[f.variable_name] = out[f.variable_name] ?? f.value;
            }
        }
    }
    return out;
}

function pickWebhookUserId(meta) {
    const u = meta.user_id ?? meta.userId;
    if (u == null) return undefined;
    const s = String(u).trim();
    return s !== '' ? s : undefined;
}

/**
 * Verifies Paystack signature. On charge.success we finalize checkout (idempotent) and send
 * customer + admin mails so ADMINEMAIL1 gets notified even if the shopper never loads /success.
 * Keep Dashboard webhook URL pointing here (e.g. https://api.yoursite.com/api/webhook).
 */
const webhooks = async (request, response) => {
    try {
        const signature = request.headers['x-paystack-signature']
        const rawBody = request.paystackRawBody

        if (!validatePaystackWebhookSignature(rawBody, signature)) {
            response.status(401).send('Unauthorized')
            return
        }

        const payload = request.body

        if (payload.event === 'charge.success') {
            const d = payload.data || {}
            const reference = [
                d.reference,
                d.transaction_reference,
                d.trans_reference,
                d?.transaction?.reference,
                d?.authorization?.reference,
            ]
                .find((x) => typeof x === 'string' && x.trim())
                ?.trim() || ''

            console.log('[Paystack webhook] charge.success reference:', reference || '(missing)')

            const metaPayload = normalizeWebhookMeta(d.metadata)
            const requestUserId = pickWebhookUserId(metaPayload)

            if (reference) {
                try {
                    const result = await finalizePaystackByReference(reference, requestUserId, {
                        resendEmailsForExisting: false,
                    })
                    console.log('[Paystack webhook] finalized checkout', {
                        ok: result.ok,
                        alreadyExists: result.alreadyExists,
                        reference,
                    })
                    if (!result.ok) {
                        console.error('[Paystack webhook] finalize rejected:', reference, result.message)
                        const code = Number(result.statusCode) || 400
                        if (code >= 500) {
                            response.status(503).json({
                                success: false,
                                message: result.message || 'Temporary failure',
                            })
                            return
                        }
                    }
                } catch (finalizeErr) {
                    console.error('[Paystack webhook] finalize failed:', finalizeErr)
                    response.status(503).json({
                        success: false,
                        message: 'Finalize failed',
                    })
                    return
                }
            } else {
                console.warn(
                    '[Paystack webhook] charge.success missing reference. data keys:',
                    d && typeof d === 'object' ? Object.keys(d).slice(0, 40) : d
                )
            }
        }

        response.status(200).json({
            success: true,
            message: 'Webhook received',
        })
    } catch (err) {
        console.error('[Paystack webhook] handler error:', err)
        response.status(500).json({
            success: false,
            message: 'Webhook handler error',
        })
    }
}

module.exports = webhooks
