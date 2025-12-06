import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/PageLayout.css";
import "../../styles/GlobalTheme.css";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <p className="loading-profile">Loading...</p>;

  return (
    <div className="page-container">
      <h2 className="page-title">🛠️ Admin Profile</h2>

      <div className="pastel-card profile-card">
        <div className="profile-avatar admin-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>College ID:</strong> {user.collegeId}</p>
          <p><strong>Email:</strong> {user.email || "Not Provided"}</p>
          <p><strong>Role:</strong> Admin 🛠️</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
