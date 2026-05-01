import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaChartLine, FaArrowUp } from "react-icons/fa";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import SalesOverviewChart from "../analysis/overview/SalesOverViewChart";
import CategoryDistributionChart from "../analysis/overview/CategoryDistributionChart";
import DailySalesTrend from "../analysis/overview/DailySalesTrend";
import SummaryApi from "../common";
import { orderCountsTowardRevenue, orderIsDelivered } from "../helpers/orderAnalytics";

const SalesPage = () => {
    const [salesStats, setSalesStats] = useState({
        totalRevenue: "₦0.00",
        averageOrderValue: "₦0.00",
        conversionRate: "0%",
        salesGrowth: "0%",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatCurrency = (value) => {
        return `₦${new Intl.NumberFormat("en-NG").format(value.toFixed(2))}`;
    };

    const calculateSalesGrowth = (salesYesterday, salesTwoDaysAgo) => {
        if (salesTwoDaysAgo === 0) return "N/A";
        const growth = ((salesYesterday - salesTwoDaysAgo) / salesTwoDaysAgo) * 100;
        return `${growth.toFixed(2)}%`;
    };

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch(SummaryApi.allOrders.url, {
                    method: SummaryApi.allOrders.method,
                    credentials: "include",
                });
                const data = await response.json();

                if (!data.success) {
                    setError(data.message || "Failed to fetch sales data.");
                    return;
                }

                const orders = data.data || [];
                const revenueOrders = orders.filter(orderCountsTowardRevenue);

                const totalRevenue = revenueOrders.reduce(
                    (sum, order) => sum + Number(order.totalPrice || 0),
                    0
                );
                const averageOrderValue =
                    revenueOrders.length > 0 ? totalRevenue / revenueOrders.length : 0;

                const nonCancelled = orders.filter((o) => o.status !== "Cancelled");
                const deliveredCount = orders.filter(orderIsDelivered).length;
                const conversionRate =
                    nonCancelled.length > 0
                        ? (deliveredCount / nonCancelled.length) * 100
                        : 0;

                const todayStr = new Date().toDateString();
                const y = new Date();
                y.setDate(y.getDate() - 1);
                const yesterdayStr = y.toDateString();

                const salesToday = revenueOrders
                    .filter((order) => new Date(order.createdAt).toDateString() === todayStr)
                    .reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);

                const salesYesterday = revenueOrders
                    .filter((order) => new Date(order.createdAt).toDateString() === yesterdayStr)
                    .reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);

                const salesGrowth = calculateSalesGrowth(salesToday, salesYesterday);

                setSalesStats({
                    totalRevenue: formatCurrency(totalRevenue),
                    averageOrderValue: formatCurrency(averageOrderValue),
                    conversionRate: `${conversionRate.toFixed(2)}%`,
                    salesGrowth,
                });
            } catch (err) {
                console.error("Error fetching sales data:", err);
                setError("Failed to fetch sales data.");
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="h-full flex flex-col">
            <Header title="Sales Dashboard" />
            <div className="flex-1 overflow-y-auto">
                <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                    {/* SALES STATS */}
                    <motion.div
                        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <StatCard
                            name="Total Revenue"
                            icon={TbCurrencyNaira}
                            value={salesStats.totalRevenue}
                            color="#6366F1"
                        />
                        <StatCard
                            name="Avg. Order Value"
                            icon={TbCurrencyNaira}
                            value={salesStats.averageOrderValue}
                            color="#10B981"
                        />
                        <StatCard
                            name="Fulfillment ratio"
                            icon={FaChartLine}
                            value={salesStats.conversionRate}
                            color="#F59E0B"
                        />
                        <StatCard
                            name="Sales vs yesterday"
                            icon={FaArrowUp}
                            value={salesStats.salesGrowth}
                            color="#EF4444"
                        />
                    </motion.div>

                    <SalesOverviewChart />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                        <CategoryDistributionChart />
                        <DailySalesTrend />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SalesPage;
