import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";
import "../../styles/GlobalTheme.css";
import "../../styles/PageLayout.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedTable, setSelectedTable] = useState("Table 1");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);

    const totalAmount = saved.reduce(
      (sum, i) => sum + i.price * (i.quantity || 1),
      0
    );
    setTotal(totalAmount);
  }, []);

  const handleConfirmPayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderData = {
        table: selectedTable,
        items: cart.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity || 1,
        })),
        totalPrice: total,
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("Order placed successfully ✔");
        localStorage.removeItem("cart");
        navigate("/student/orders");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment Failed ❌ (Check backend)");
    }
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <h2 className="payment-title">📲 Scan & Pay</h2>

        <p className="total-amount">Total Amount: ₹{total}</p>

        <label>Select Table Number:</label>
        <select
          className="table-select"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option>Table 1</option>
          <option>Table 2</option>
          <option>Table 3</option>
          <option>Table 4</option>
          <option>Table 5</option>
          <option>Table 6</option>
          <option>Table 7</option>
          <option>Table 8</option>
        </select>

        <img src="/myqr.jpg" alt="QR Code" className="qr-image" />

        <button className="btn-pay" onClick={handleConfirmPayment}>
          I Have Paid ✔
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
