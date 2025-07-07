import React, { useEffect, useState } from "react";
import './MessDashboard.css';
import { FaUserShield, FaUsers, FaStar } from 'react-icons/fa';
import { fetchMessProfile } from "../../../services/api"; // ✅ use mess profile fetcher

const MessDashboard = () => {
  const [mess, setMess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    fetchMessProfile(token)
      .then((data) => {
        setMess(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      {/* ---------- Mess Profile Section ---------- */}
      <div className="section admin">
        <h4><FaUserShield /> Mess Provider Info</h4>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : mess ? (
          <>
            <p><strong>Full Name:</strong> {mess.fullName}</p>
            <p><strong>Company Name:</strong> {mess.companyName}</p>
            <p><strong>Email:</strong> {mess.email}</p>
            <p><strong>Phone:</strong> {mess.phone}</p>
            <p><strong>Monthly Price:</strong> ₹{mess.monthlyPrice}</p>
            <p><strong>Address:</strong></p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Plot Number: {mess.address.plotNumber}</li>
              <li>Landmark: {mess.address.landmark}</li>
              <li>Area: {mess.address.area}</li>
              <li>City: {mess.address.city}</li>
              <li>State: {mess.address.state}</li>
              <li>Country: {mess.address.country}</li>
              <li>Pin Code: {mess.address.pincode}</li>
            </ul>
          </>
        ) : (
          <p>No mess provider data found</p>
        )}
      </div>

      {/* ---------- Rating Section ---------- */}
      <div className="section rating">
        <h4><FaStar /> Average Rating</h4>
        <p style={{ fontSize: "18px", fontWeight: "500" }}>
          {mess?.averageRating ? `${mess.averageRating} / 5 ⭐` : "Review till now"}
        </p>
        <p style={{ fontSize: "14px", color: "#555" }}>
          {mess?.ratingCount ? `Based on ${mess.ratingCount} reviews` : "Review till now"}
        </p>
      </div>

      {/* ---------- Total Connections Section ---------- */}
      <div className="section connections">
        <h4><FaUsers /> Total Connections</h4>

        {/* Past Experience */}
        <div style={{ marginBottom: "20px" }}>
          <h5 style={{ fontSize: "22px", color: "#2c3e50", marginBottom: "5px", fontWeight: "600" }}>
            Past Experience
          </h5>

          <p style={{ fontSize: "18px", fontWeight: "500" }}>
            {mess?.connectionCount || 0} students connected till today
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>Updated recently</p>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "15px 0" }} />

        {/* Current Status */}
        <div>
          <h5 style={{ fontSize: "22px", color: "#2c3e50", marginBottom: "5px", fontWeight: "600" }}>
            Current Status
          </h5>
          <p style={{ fontSize: "18px", fontWeight: "500" }}>
            {mess?.connectionCount || 0} students currently connected
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>Updated recently</p>
        </div>
      </div>

    </div>
  );
};

export default MessDashboard;
