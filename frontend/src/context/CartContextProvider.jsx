/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage on refresh
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  // Save cart every update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ----------------------------------
       ADD TO CART (Quantity support)
  ---------------------------------- */
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);

      if (exists) {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /* ----------------------------------
            REMOVE ITEM
        (Decrease quantity)
  ---------------------------------- */
  const removeFromCart = (id) => {
    setCart((prev) => {
      const found = prev.find((i) => i._id === id);

      if (found.quantity > 1) {
        return prev.map((i) =>
          i._id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }

      return prev.filter((i) => i._id !== id);
    });
  };

  /* ----------------------------------
            CLEAR CART
  ---------------------------------- */
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  /* ----------------------------------
            PLACE ORDER
  ---------------------------------- */
  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return false;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login!");
      return false;
    }

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          totalPrice,
        }),
      });

      await res.json();

      if (!res.ok) {
        alert("Order failed!");
        return false;
      }

      clearCart();
      alert("Order placed successfully! ❤️");
      return true;
    } catch (error) {
      console.log("ORDER ERROR:", error);
      alert("Failed to place order");
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
