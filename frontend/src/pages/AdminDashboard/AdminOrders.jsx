import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./AdminOrders.css";
import "../../styles/PageLayout.css";
import "../../styles/GlobalTheme.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }

      setError("");
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `http://localhost:5000/api/orders/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="admin-orders-container">
      <h2 className="orders-heading">📦 Orders Summary</h2>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">No orders found.</div>
      ) : (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Table No</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  {/* ✔ Table Number */}
                  <td>Table {o.table}</td>

                  {/* ✔ Customer Name */}
                  <td>{o.user?.name || "Student"}</td>

                  {/* ✔ Items */}
                  <td>
                    {o.items.map((i, idx) => (
                      <div key={idx}>
                        {i.name} — ₹{i.price} × {i.quantity}
                      </div>
                    ))}
                  </td>

                  {/* ✔ Total Price */}
                  <td>₹{o.totalPrice}</td>

                  {/* ✔ Status Badge */}
                  <td>
                    <span className={`status-badge ${o.status.toLowerCase()}`}>
                      {o.status}
                    </span>
                  </td>

                  {/* ✔ Action Buttons */}
                  <td>
                    {o.status === "Pending" && (
                      <button
                        className="action-btn btn-start"
                        onClick={() => updateStatus(o._id, "Preparing")}
                      >
                        Start Preparing 🍳
                      </button>
                    )}

                    {o.status === "Preparing" && (
                      <button
                        className="action-btn btn-ready"
                        onClick={() => updateStatus(o._id, "Ready")}
                      >
                        Mark Ready 🔔
                      </button>
                    )}

                    {o.status === "Ready" && (
                      <button
                        className="action-btn btn-deliver"
                        onClick={() => updateStatus(o._id, "Delivered")}
                      >
                        Deliver Order 🚚
                      </button>
                    )}

                    {o.status === "Delivered" && (
                      <span className="delivered-tag">✔ Delivered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
