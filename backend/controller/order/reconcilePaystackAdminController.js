const { finalizePaystackByReference } = require('./paystackFinalizeOrder');

/**
 * ADMIN: Recover a checkout row using Paystack reference (dashboard or customer receipt).
 */
const reconcilePaystackAdminController = async (request, response) => {
    try {
        const ref =
            typeof request.body?.reference === 'string'
                ? request.body.reference.trim()
                : '';
        const trxref =
            typeof request.body?.trxref === 'string' ? request.body.trxref.trim() : '';

        const reference = ref || trxref;
        if (!reference) {
            return response.status(400).json({
                success: false,
                error: true,
                message:
                    'Missing Paystack reference. Paste value from dashboard (Transactions) or from customer URL (?reference=…).',
            });
        }

        const result = await finalizePaystackByReference(reference, request.userId, {
            resendEmailsForExisting: false,
            verifyProfile: 'thorough',
        });

        return response.status(result.statusCode).json({
            success: result.ok,
            error: !result.ok,
            message: result.message,
            alreadyExists: !!result.alreadyExists,
            data: result.data,
            ...(result.warnings?.length ? { warnings: result.warnings } : {}),
        });
    } catch (error) {
        console.error('reconcilePaystackAdminController:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: error.message || 'Reconcile failed.',
        });
    }
};

module.exports = reconcilePaystackAdminController;
