import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collegeId, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful! 🎉");

        // 🟢 Save user + token + role
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role); // VERY IMPORTANT

        // Redirect to dashboard selection
        navigate("/dashboard-select");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Welcome Back 👋</h2>

        <input
          type="text"
          placeholder="Enter your College ID"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="auth-btn">
          Login
        </button>

        <p className="switch-text">
          Don't have an account?{" "}
          <span className="register-link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
