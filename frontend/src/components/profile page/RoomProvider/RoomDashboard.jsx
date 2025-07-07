import React, { useEffect, useState } from "react";
import './RoomDashboard.css';
import { FaUserShield, FaUsers, FaStar } from 'react-icons/fa';
import { fetchRoomProfile } from "../../../services/api";

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
      {/* ---------- Room Provider Info Section ---------- */}
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
              <li><strong>Plot Number:</strong> {room.address.plotNumber}</li>
              <li><strong>Street:</strong> {room.address.street}</li>
              <li><strong>Landmark:</strong> {room.address.landmark}</li>
              <li><strong>City:</strong> {room.address.city}</li>
              <li><strong>Pin Code:</strong> {room.address.pincode}</li>
            </ul>
          </>
        ) : (
          <p>No room provider data found</p>
        )}
      </div>

      {/* ---------- Rating Section ---------- */}
      <div className="section rating">
        <h4><FaStar /> Average Rating</h4>
        <p style={{ fontSize: "18px", fontWeight: "500" }}>
          {room?.averageRating ? `${room.averageRating.toFixed(1)} / 5 ⭐` : "No rating yet"}
        </p>
        <p style={{ fontSize: "14px", color: "#555" }}>
          {room?.totalRatings
            ? `Based on ${room.totalRatings} review${room.totalRatings > 1 ? 's' : ''}`
            : "No reviews yet"}
        </p>
      </div>

      {/* ---------- Connections Section ---------- */}
      <div className="section connections">
        <h4><FaUsers /> Total Connections</h4>
        <p style={{ fontSize: "18px", fontWeight: "500" }}>
          {room?.connectionCount || 0} student{room?.connectionCount === 1 ? '' : 's'} connected
        </p>
        <p style={{ fontSize: "14px", color: "#555" }}>Updated recently</p>
      </div>
    </div>
  );
};

export default RoomDashboard;
