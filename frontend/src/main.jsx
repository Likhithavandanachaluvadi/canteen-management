import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CartContextProvider from "./context/CartContextProvider"; // ✅ correct import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
