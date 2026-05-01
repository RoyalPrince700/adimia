import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaClock, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import DailyOrders from "../analysis/overview/DailyOrders";
import OrderDistribution from "../analysis/overview/OrderDistribution";
import OrdersTable from "../analysis/overview/OrdersTable";
import SummaryApi from "../common";
import { orderCountsTowardRevenue, orderIsDelivered } from "../helpers/orderAnalytics";

const AdminOrderPage = () => {
    const [orderStats, setOrderStats] = useState({
        totalOrders: "0",
        pendingOrders: "0",
        completedOrders: "0",
        totalRevenue: "₦0.00",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ordersRefreshKey, setOrdersRefreshKey] = useState(0);
    const [reconcileRef, setReconcileRef] = useState("");
    const [reconcileBusy, setReconcileBusy] = useState(false);

    const formatCurrency = (value) => {
        return `₦${new Intl.NumberFormat("en-NG").format(value.toFixed(2))}`;
    };

    const applyStatsFromOrders = (orders) => {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter((order) => order.status === "Pending").length;
        const completedOrders = orders.filter((order) => orderIsDelivered(order)).length;
        const totalRevenue = orders
            .filter((order) => orderCountsTowardRevenue(order))
            .reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
        setOrderStats({
            totalOrders: totalOrders.toString(),
            pendingOrders: pendingOrders.toString(),
            completedOrders: completedOrders.toString(),
            totalRevenue: formatCurrency(totalRevenue),
        });
    };

    const fetchOrderStats = async () => {
        const response = await fetch(SummaryApi.allOrders.url, {
            method: SummaryApi.allOrders.method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        const data = await response.json();

        if (!data.success) {
            setError(data.message || "Failed to fetch order stats.");
            return;
        }
        applyStatsFromOrders(data.data);
    };

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                await fetchOrderStats();
            } catch (err) {
                console.error("Error fetching order stats:", err);
                if (!cancelled) setError("Failed to fetch order stats.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const quietRefreshStats = async () => {
        try {
            await fetchOrderStats();
        } catch (e) {
            console.error(e);
        }
    };

    const handleReconcilePaystack = async () => {
        const trimmed = reconcileRef.trim();
        if (!trimmed) {
            toast.error("Paste the Paystack transaction reference first.");
            return;
        }
        setReconcileBusy(true);
        try {
            const response = await fetch(SummaryApi.reconcilePaystack.url, {
                method: SummaryApi.reconcilePaystack.method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reference: trimmed }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(
                    data.alreadyExists
                        ? data.message || "This reference is already linked to an order."
                        : data.message || "Order imported from Paystack."
                );
                if (Array.isArray(data.warnings) && data.warnings.length) {
                    data.warnings.forEach((w) => toast.warning(w));
                }
                setReconcileRef("");
                setOrdersRefreshKey((k) => k + 1);
                await quietRefreshStats();
            } else {
                toast.error(data.message || "Could not reconcile this reference.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Reconcile request failed.");
        } finally {
            setReconcileBusy(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex-1 relative z-10 overflow-y-auto h-screen">
            <Header title="Orders" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-sm font-semibold text-slate-900">
                        Recover a missing Paystack payment
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        If a customer paid live but the order never appeared, paste the Paystack
                        reference here (from Paystack Dashboard → Transactions, or from the return
                        URL{" "}
                        <code className="rounded bg-slate-100 px-1 text-xs">?reference=...</code>).
                        The server must use the same live secret key as when the charge was made.
                    </p>
                    <div className="mt-4 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                            type="text"
                            value={reconcileRef}
                            onChange={(e) => setReconcileRef(e.target.value)}
                            placeholder="e.g. admiaworld-1730… or T123456789012345"
                            className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                            disabled={reconcileBusy}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={handleReconcilePaystack}
                            disabled={reconcileBusy}
                            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                        >
                            {reconcileBusy ? "Checking…" : "Import order"}
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name="Total Orders"
                        icon={FaShoppingCart}
                        value={orderStats.totalOrders}
                        color="#6366F1"
                    />
                    <StatCard
                        name="Pending Orders"
                        icon={FaClock}
                        value={orderStats.pendingOrders}
                        color="#F59E0B"
                    />
                    <StatCard
                        name="Completed Orders"
                        icon={FaCheckCircle}
                        value={orderStats.completedOrders}
                        color="#10B981"
                    />
                    <StatCard
                        name="Total Revenue"
                        icon={FaMoneyBillWave}
                        value={orderStats.totalRevenue}
                        color="#EF4444"
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <DailyOrders />
                    <OrderDistribution />
                </div>

                <OrdersTable refreshKey={ordersRefreshKey} />
            </main>
        </div>
    );
};

export default AdminOrderPage;
