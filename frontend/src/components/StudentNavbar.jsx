import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const StudentNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar student-navbar">
      <div className="navbar-left">
        <h2 className="navbar-logo">🍴 Canteen Portal</h2>
      </div>

      <div className="navbar-links">
        <Link
          to="/student/menu"
          className={location.pathname === "/student/menu" ? "active" : ""}
        >
          Menu
        </Link>

        <Link
          to="/student/orders"
          className={location.pathname === "/student/orders" ? "active" : ""}
        >
          Orders
        </Link>

        <Link
          to="/student/cart"
          className={location.pathname === "/student/cart" ? "active" : ""}
        >
          Cart
        </Link>

        <Link
          to="/student/profile"
          className={location.pathname === "/student/profile" ? "active" : ""}
        >
          Profile
        </Link>

        {/* 🔥 Logout */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;
