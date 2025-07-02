import React, { useEffect, useState } from "react";
import './Dashboard.css';
import { FaUserShield, FaUtensils, FaBed } from 'react-icons/fa';
import { fetchStudentProfile } from "../../../services/api";

const Dashboard = () => {
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

      {/* ---------- Mess Section ---------- */}
      <div className="section mess">
        <h4><FaUtensils /> MESS SERVICE</h4>
        {student?.selectedMess ? (
          <>
            <p><strong>Service provider name:</strong> {student.selectedMess.fullName}</p>
            <p><strong>Mess name:</strong> {student.selectedMess.companyName}</p>
            <p><strong>Contact:</strong> {student.selectedMess.phone}</p>
            <p><strong>Location:</strong> {student.selectedMess.address?.area}, {student.selectedMess.address?.city}</p>
            <p><strong>Date of Joining:</strong> {formatDate(student.selectedMessDate)}</p>
            <p><strong>Date of Due:</strong> {getDueDate(student.selectedMessDate)}</p>
          </>
        ) : (
          <p>No mess selected yet.</p>
        )}
      </div>

      {/* ---------- Room Section ---------- */}
      <div className="section room">
        <h4><FaBed /> ROOM SERVICE</h4>
        {student?.selectedRoom ? (
          <>
            <p><strong>Service provider name:</strong> {student.selectedRoom.fullName}</p>
            <p><strong>Room name:</strong> {student.selectedRoom.messName}</p>
            <p><strong>Contact:</strong> {student.selectedRoom.phone}</p>
            <p><strong>Location:</strong> {student.selectedRoom.address?.street}, {student.selectedRoom.address?.city}</p>
            <p><strong>Date of Joining:</strong> {formatDate(student.selectedRoomDate)}</p>
            <p><strong>Date of Due:</strong> {getDueDate(student.selectedRoomDate)}</p>
          </>
        ) : (
          <p>No room selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
