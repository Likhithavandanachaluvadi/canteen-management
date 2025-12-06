// src/AppContent.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardSelect from "./pages/DashboardSelect";

// Navbars
import StudentNavbar from "./components/StudentNavbar";
import AdminNavbar from "./components/AdminNavbar";

// Student Pages
import StudentMenu from "./pages/StudentDashboard/StudentMenu";
import StudentOrders from "./pages/StudentDashboard/StudentOrders";
import StudentCart from "./pages/StudentDashboard/Cart";
import StudentProfile from "./pages/StudentDashboard/StudentProfile";
import PaymentPage from "./pages/StudentDashboard/PaymentPage";

// Admin Pages
import AdminMenu from "./pages/AdminDashboard/AdminMenu";
import AdminOrders from "./pages/AdminDashboard/AdminOrders";
import AdminProfit from "./pages/AdminDashboard/Profit";
import AdminProfile from "./pages/AdminDashboard/AdminProfile";

function AppContent() {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // Hide Navbar on login/register/dashboard-select
  const hideNavbarRoutes = ["/login", "/register", "/dashboard-select"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    if (role) localStorage.setItem("role", role);
  }, [role]);

  const renderNavbar = () => {
    if (hideNavbar) return null;
    if (role === "student") return <StudentNavbar />;
    if (role === "admin") return <AdminNavbar />;
    return null;
  };

  return (
    <>
      {renderNavbar()}

      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Selection */}
        <Route
          path="/dashboard-select"
          element={<DashboardSelect setRole={setRole} />}
        />

        {/* Student Dashboard */}
        <Route path="/student/menu" element={<StudentMenu />} />
        <Route path="/student/orders" element={<StudentOrders />} />
        <Route path="/student/cart" element={<StudentCart />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/payment" element={<PaymentPage />} />
         
        {/* Admin Dashboard */}
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/profit" element={<AdminProfit />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default AppContent;
