import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/PageLayout.css";
import "../../styles/GlobalTheme.css";
import "./StudentOrders.css";

const StudentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) setOrders(res.data.orders || []);
      setLoading(false);
    } catch (err) {
      console.error("Order Load Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <p className="loading fade-in">Loading...</p>;

  if (!orders.length)
    return (
      <div className="page-container">
        <h2 className="page-title">📦 My Orders</h2>
        <p>No orders yet.</p>
      </div>
    );

  return (
    <div className="page-container">
      <h2 className="page-title">📦 My Orders</h2>

      {orders.map((order) => (
        <div className="pastel-card order-card slide-up" key={order._id}>
          <p><strong>Order ID:</strong> {order._id}</p>

          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

          {/* ⭐ TABLE NUMBER */}
          <p>
            <strong>Table:</strong> {order.table || "Not Selected"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge status-${(order.status || "Pending").toLowerCase()}`}>
              {order.status || "Pending"}
            </span>
          </p>

          <p>
            <strong>Total:</strong> ₹{order.totalPrice ?? 0}
          </p>

          <ul className="order-items">
            {(order.items || []).map((item, i) => (
              <li key={i}>
                {item.name} - ₹{item.price} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StudentOrders;
