import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // ✅ DEFAULT ROLE
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          collegeId,
          email,
          password,
          role, // ✅ SEND ROLE TO BACKEND
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful! 🎉 Please login now.");
        navigate("/login");
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>
        <p className="subtitle">Register your canteen account</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="College ID"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* ⭐ ROLE SELECTION DROPDOWN */}
        <select
          className="role-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="auth-btn">
          Register
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span className="register-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
