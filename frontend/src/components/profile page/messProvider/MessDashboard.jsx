import React, { useEffect, useState } from "react";
import './MessDashboard.css';
import { FaUserShield, FaUsers, FaStar } from 'react-icons/fa';
import { fetchStudentProfile } from "../../../services/api";

const MessDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found.");
      setError("No token found");
      setLoading(false);
      return;
    }

    fetchStudentProfile(token)
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch student data:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getDueDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + 1);
    return formatDate(date);
  };

  return (
    <div className="dashboard-container">
      {/* ---------- Admin Section ---------- */}
      <div className="section admin">
        <h4><FaUserShield /> Admin Details</h4>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : student && student.address ? (
          <>
            <p><strong>Name:</strong> {student.fullName}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>College:</strong> {student.college}</p>
            <p><strong>Address:</strong></p>
            <ul style={{ marginLeft: "20px" }}>
              <li>Plot Number: {student.address.plotNumber}</li>
              <li>Landmark: {student.address.landmark}</li>
              <li>Area: {student.address.area}</li>
              <li>City: {student.address.city}</li>
              <li>State: {student.address.state}</li>
              <li>Country: {student.address.country}</li>
              <li>Pin Code: {student.address.pinCode}</li>
            </ul>
          </>
        ) : (
          <p>No student data found</p>
        )}
      </div>

      {/* ---------- Rating Section ---------- */}
      <div className="section rating">
        <h4><FaStar /> Overall Rating</h4>
        <p style={{ fontSize: "18px", fontWeight: "500" }}>4.3 / 5 ⭐</p>
        <p style={{ fontSize: "14px", color: "#555" }}>Based on 86 student reviews</p>
      </div>

      {/* ---------- Total Connections Section ---------- */}
      <div className="section connections">
        <h4><FaUsers /> Total Connections</h4>
        <p style={{ fontSize: "18px", fontWeight: "500" }}>102 students connected</p>
        <p style={{ fontSize: "14px", color: "#555" }}>Updated recently</p>
      </div>
      
      
    </div>
  );
};

export default MessDashboard;
