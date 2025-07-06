import React, { useEffect, useState } from "react";
import './RoomDashboard.css';
import { FaUserShield, FaUsers, FaStar } from 'react-icons/fa';
import { fetchRoomProfile } from "../../../services/api"; // ✅ use mess profile fetcher

const RoomDashboard = () => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    fetchRoomProfile(token)
      .then((data) => {
        setRoom(data);
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
        <h4><FaUserShield /> Room Provider Info</h4>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : room ? (
          <>
            <p><strong>Full Name:</strong> {room.fullName}</p>
            <p><strong>Company Name:</strong> {room.messName}</p>
            <p><strong>Email:</strong> {room.email}</p>
            <p><strong>Phone:</strong> {room.phone}</p>
            <p><strong>Monthly Price:</strong> ₹{room.monthlyPrice}</p>
            <p><strong>Address:</strong></p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Plot Number: {room.address.plotNumber}</li>
              <li>Street: {room.address.street}</li>
              <li>Landmark: {room.address.landmark}</li>
              <li>City: {room.address.city}</li>
              <li>Pin Code: {room.address.pincode}</li>
            </ul>
          </>
        ) : (
          <p>No Room provider data found</p>
        )}
      </div>

      {/* ---------- Rating Section ---------- */}
      <div className="section rating">
        <h4><FaStar /> Average Rating</h4>
        <p style={{ fontSize: "18px", fontWeight: "500" }}>
          {room?.averageRating ? `${room.averageRating} / 5 ⭐` : "No rating yet"}
        </p>
        <p style={{ fontSize: "14px", color: "#555" }}>
          {room?.ratingSum ? `Based on ${room.ratingSum} reviews` : "No reviews yet"}
        </p>
      </div>

      {/* ---------- Total Connections Section ---------- */}
      <div className="section connections">
        <h4><FaUsers /> Total Connections</h4>
        <p style={{ fontSize: "18px", fontWeight: "500" }}>
          {room?.connectionCount || 0} students connected
        </p>
        <p style={{ fontSize: "14px", color: "#555" }}>Updated recently</p>
      </div>
    </div>
  );
};

export default RoomDashboard;
