const checkoutModel = require("../../models/checkoutModel");

/**
 * Bucket sales by inferred channel from paymentMethod (schema has no salesChannel field).
 */
const salesByChannelController = async (req, res) => {
    try {
        const salesData = await checkoutModel.aggregate([
            {
                $match: {
                    status: { $ne: "Cancelled" },
                },
            },
            {
                $addFields: {
                    pmLower: {
                        $toLower: {
                            $trim: {
                                input: { $toString: { $ifNull: ["$paymentMethod", ""] } },
                            },
                        },
                    },
                },
            },
            {
                $addFields: {
                    channelBucket: {
                        $cond: [
                            { $regexMatch: { input: "$pmLower", regex: /paystack/ } },
                            "Paystack",
                            {
                                $cond: [
                                    { $eq: ["$pmLower", "pay on delivery"] },
                                    "Pay on Delivery",
                                    {
                                        $cond: [
                                            { $eq: ["$pmLower", ""] },
                                            "Unknown",
                                            { $ifNull: ["$paymentMethod", "Other"] },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$channelBucket",
                    totalSales: { $sum: "$totalPrice" },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    name: {
                        $ifNull: ["$_id", "Unknown"],
                    },
                    value: "$totalSales",
                    count: 1,
                    _id: 0,
                },
            },
            { $sort: { value: -1 } },
        ]);

        res.json({
            success: true,
            data: salesData,
            message: "Sales by channel data fetched successfully.",
            error: false,
        });
    } catch (error) {
        console.error("Error in salesByChannelController:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch sales by channel data.",
            error: true,
        });
    }
};

module.exports = salesByChannelController;
