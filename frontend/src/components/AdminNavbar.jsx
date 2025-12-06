import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar admin-navbar">
      <div className="navbar-left">
        <h2 className="navbar-logo">🛠️ Admin Dashboard</h2>
      </div>

      <div className="navbar-links">
        <Link
          to="/admin/menu"
          className={location.pathname === "/admin/menu" ? "active" : ""}
        >
          Menu
        </Link>

        <Link
          to="/admin/orders"
          className={location.pathname === "/admin/orders" ? "active" : ""}
        >
          Orders
        </Link>

        <Link
          to="/admin/profit"
          className={location.pathname === "/admin/profit" ? "active" : ""}
        >
          Profit
        </Link>

        <Link
          to="/admin/profile"
          className={location.pathname === "/admin/profile" ? "active" : ""}
        >
          Profile
        </Link>

        {/* 🔥 Logout Button */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
