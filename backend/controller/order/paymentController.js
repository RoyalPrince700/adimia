const userModel = require('../../models/userModel')
const { getFrontendBaseUrl } = require('../../config/envUrls.js')
const { paystackInitialize } = require('../../lib/paystack')

const paymentController = async (request, response) => {

    try {
        const { cartItems, shippingDetails } = request.body

        const user = await userModel.findOne({ _id: request.userId })

        const totalAmount = cartItems.reduce((sum, item) => {
            return sum + (item.productId.sellingPrice * item.quantity)
        }, 0)

        const storefront = getFrontendBaseUrl()

        const reference = `admiaworld-${Date.now()}-${request.userId}`
        const amountKobo = Math.round(Number(totalAmount) * 100)

        const payload = {
            email: user.email,
            amount: amountKobo,
            currency: 'NGN',
            reference,
            callback_url: `${storefront}/success`,
            metadata: {
                user_id: request.userId.toString(),
                name: String(shippingDetails?.name ?? ''),
                number: String(shippingDetails?.number ?? ''),
                address: String(shippingDetails?.address ?? ''),
                note: String(shippingDetails?.note ?? ''),
                cartItems: JSON.stringify(
                    cartItems.map((item) => ({
                        productId: item.productId._id.toString(),
                        productName: item.productId.productName,
                        quantity: item.quantity,
                        price: item.productId.sellingPrice,
                    }))
                ),
            },
        }

        console.log('Initiating Paystack transaction…')

        const response_data = await paystackInitialize(payload)
        console.log('Paystack initialize response:', response_data?.status, response_data?.message)

        if (response_data.status === true && response_data.data?.authorization_url) {
            response.status(200).json({
                success: true,
                data: {
                    authorization_url: response_data.data.authorization_url,
                    reference: response_data.data.reference,
                },
            })
        } else {
            throw new Error(response_data.message || 'Failed to initialize payment')
        }
    } catch (error) {
        response.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = paymentController
