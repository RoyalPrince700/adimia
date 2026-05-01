import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import SummaryApi from "../../common";
import { orderCountsTowardRevenue } from "../../helpers/orderAnalytics";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const SalesOverviewChart = () => {
  const [weeklySalesData, setWeeklySalesData] = useState(() =>
    DAYS.map((name) => ({ name, sales: 0 }))
  );

  const fetchWeeklySales = async () => {
    try {
      const response = await fetch(SummaryApi.allOrders.url, {
        method: SummaryApi.allOrders.method,
        credentials: "include",
      });
      const dataResponse = await response.json();

      if (!dataResponse.success || !Array.isArray(dataResponse.data)) {
        return;
      }

      const updatedSalesData = DAYS.map((name) => ({ name, sales: 0 }));

      dataResponse.data.forEach((order) => {
        if (!orderCountsTowardRevenue(order)) return;
        const orderDate = new Date(order.createdAt);
        const dayOfWeek = orderDate.getDay();
        updatedSalesData[dayOfWeek].sales += Number(order.totalPrice || 0);
      });

      setWeeklySalesData(updatedSalesData);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchWeeklySales();
  }, []);

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Sales Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={weeklySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey={"name"} stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
                color: "#111827"
              }}
              itemStyle={{ color: "#374151" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
