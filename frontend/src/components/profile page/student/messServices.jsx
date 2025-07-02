import React, { useEffect, useState } from 'react';
import './Services.css';
import { fetchStudentProfile } from '../../../services/api';

const MessServices = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token not found");
      setLoading(false);
      return;
    }

    fetchStudentProfile(token)
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch student profile:", err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDueDate = (joinDate) => {
    if (!joinDate) return "N/A";
    const date = new Date(joinDate);
    date.setMonth(date.getMonth() + 1);
    return formatDate(date);
  };

  return (
    <div className="service-container">
      <h3 className="service-title">Current Mess Service</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : student?.selectedMess ? (
        <div className="card-wrapper">
          {/* Info Card */}
          <div className="info-card">
            <p><strong>Service Name:</strong> {student.selectedMess.companyName}</p>
            <p><strong>Service Provider:</strong> {student.selectedMess.fullName}</p>
            <p><strong>Contact Number:</strong> {student.selectedMess.phone}</p>
            <p><strong>Location:</strong> {student.selectedMess.address?.area}, {student.selectedMess.address?.city}</p>
            <p><strong>Date of Joining:</strong> {formatDate(student.selectedMessDate)}</p>
            <p><strong>Date of Due:</strong> {getDueDate(student.selectedMessDate)}</p>
          </div>

          {/* Message Card */}
          <div className="message-card">
            <h4>Drop Message</h4>
            <textarea rows="6" placeholder="Write your message here..." />
            <div className="service-buttons">
              <button className="send">Send</button>
              <button className="change">Change</button>
              <button className="remove">Remove</button>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ padding: "1rem" }}>No mess selected yet.</p>
      )}
    </div>
  );
};

export default MessServices;
