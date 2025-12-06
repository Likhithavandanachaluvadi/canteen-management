import React from "react";
import { useCart } from "../../context/CartContextProvider";
import { useNavigate } from "react-router-dom";
import "../../styles/GlobalTheme.css";
import "./StudentCart.css";

const StudentCart = () => {
  const { cart, addToCart, removeOne, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="page-container">
      <h2 className="page-title">🛒 My Cart</h2>

      {cart.length === 0 ? (
        <p className="no-items">Your cart is empty!</p>
      ) : (
        <div className="cart-card">

          {/* CART ITEMS GRID */}
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item" key={index}>
                <h4>{item.name}</h4>

                {/* PRICE & QTY */}
                <p>Price: ₹{item.price}</p>

                <div className="qty-box">
                  <button
                    className="qty-btn"
                    onClick={() => removeOne(item._id)}
                  >
                    –
                  </button>

                  <span className="qty-text">{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>

                <p className="item-total">Total: ₹{item.price * item.quantity}</p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove Item ❌
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h3>Grand Total: ₹{total}</h3>
            <button
              className="checkout-btn"
              onClick={() => navigate("/student/payment")}
            >
              Proceed to Checkout ✔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCart;
