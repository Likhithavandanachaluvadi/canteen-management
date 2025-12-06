import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardSelect.css";

const DashboardSelect = ({ setRole }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role"); // ✅ Get role from login

  // 🔥 Auto redirect based on role
  useEffect(() => {
    if (!role) return;

    setRole(role);

    if (role === "student") {
      navigate("/student/menu");
    } else if (role === "admin") {
      navigate("/admin/menu");
    }
  }, [role, navigate, setRole]);

  return (
    <div className="dashboard-select">
      <h2>Welcome, {user?.name || user?.collegeId || "User"} 👋</h2>
      <p>Redirecting to your dashboard...</p>
    </div>
  );
};

export default DashboardSelect;
