import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import "./Profit.css";
import "../../styles/GlobalTheme.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Profit = () => {
  const [summary, setSummary] = useState(null);
  const [dailyProfit, setDailyProfit] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAllProfit = async () => {
      try {
        const token = localStorage.getItem("token");

        // 📌 Fetch Total Profit
        const totalRes = await fetch("http://localhost:5000/api/orders/summary/profit", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const totalData = await totalRes.json();

        // 📌 Fetch Daily Profit
        const dailyRes = await fetch("http://localhost:5000/api/orders/summary/daily", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const dailyData = await dailyRes.json();

        setSummary(totalData);
        setDailyProfit(dailyData.dailyProfit || {});
      } catch (err) {
        console.log("Profit Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfit();
  }, []);
  if (loading) return <p>Loading Profit...</p>;

  // 🧮 Calculate Today & Monthly profit
  const todayDate = new Date().toISOString().split("T")[0];
  const todayProfit = dailyProfit[todayDate] || 0;

  const month = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const monthProfit = Object.keys(dailyProfit)
    .filter((d) => d.startsWith(month))
    .reduce((acc, d) => acc + dailyProfit[d], 0);

  // 🎨 Bar Chart Data
  const barData = {
    labels: Object.keys(dailyProfit),
    datasets: [
      {
        label: "Daily Profit (₹)",
        data: Object.values(dailyProfit),
        backgroundColor: "#ff7b47",
      },
    ],
  };

  // 🎨 Line Chart Data
  const lineData = {
    labels: Object.keys(dailyProfit),
    datasets: [
      {
        label: "Profit Trend",
        data: Object.values(dailyProfit),
        borderColor: "#2a9d8f",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="profit-container">
      <h2>📊 Profit Overview</h2>

      <div className="profit-summary">
        <div className="card total">
          <h3>Total Profit</h3>
          <p>₹{summary?.totalProfit || 0}</p>
        </div>

        <div className="card today">
          <h3>Today’s Profit</h3>
          <p>₹{todayProfit}</p>
        </div>

        <div className="card month">
          <h3>This Month</h3>
          <p>₹{monthProfit}</p>
        </div>
      </div>

      <div className="chart-box">
        <h3>📌 Daily Profit Bar Chart</h3>
        <Bar data={barData} />
      </div>

      <div className="chart-box">
        <h3>📈 Profit Trend Line Chart</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Profit;
