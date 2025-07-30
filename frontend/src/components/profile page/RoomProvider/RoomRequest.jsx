import React, { useEffect, useState } from 'react';
import './RoomRequest.css';
import { fetchRoomRequests, acceptRoomRequest } from '../../../services/api';

const RoomRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchRoomRequests(token)
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading room requests:", err);
        setError("Failed to load requests.");
        setLoading(false);
      });
  }, []);

  const handleAccept = async (studentId) => {
    setAccepting(studentId);
    const token = localStorage.getItem("token");

    try {
      await acceptRoomRequest(token, studentId);
      // Remove request after successful acceptance
      setRequests(prev =>
        prev.filter(r => r.student._id !== studentId)
      );
    } catch (err) {
      console.error("Accept failed:", err);
      alert("Failed to accept request.");
    } finally {
      setAccepting(null);
    }
  };

  // Filter only pending room requests
  const pendingRequests = requests.filter(r => r.status === "Pending");

  return (
    <div className="room-request-container">
      <h2>🏘️ Student Room Requests</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : pendingRequests.length === 0 ? (
        <p className="no-requests">No pending requests</p>
      ) : (
        <div className="scroll-card-wrapper">
          {pendingRequests.map(({ _id, student, status }) => (
            <div key={_id} className={`student-card ${status.toLowerCase()}`}>
              <div className="student-header">
                <h4>{student.fullName}</h4>
                <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
              </div>
              <p><strong>College:</strong> {student.college}</p>
              <p><strong>Location:</strong> {"Plot Number "}{student.address.plotNumber}, {student.address.landmark}, {student.address.area}, {student.address.city}, {student.address.state}, {student.address.country}{" - "}{student.address.pinCode}</p>

              <button
                className="accept-btn"
                onClick={() => handleAccept(student._id)}
                disabled={accepting === student._id}
              >
                {accepting === student._id ? "Accepting..." : "Accept"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomRequest;
