import React, { useEffect, useState } from 'react';
import './MessRequest.css';
import { getMessRequests, acceptRequest } from '../../../services/api';

const MessRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(null); // to track loading per-button

  useEffect(() => {
    const token = localStorage.getItem("token");

    getMessRequests(token)
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch requests", err.message);
        setLoading(false);
      });
  }, []);

  const handleAccept = async (studentId) => {
    const token = localStorage.getItem("token");
    setAccepting(studentId); // show loading for that student

    try {
      await acceptRequest(token, studentId);
      setRequests((prev) =>
        prev.filter((r) => r.student._id !== studentId) // 👈 remove from UI after accept
      );
    } catch (err) {
      console.error("Accept failed:", err.message);
    } finally {
      setAccepting(null); // reset button loading
    }
  };

  return (
    <div className="mess-request-container">
      <h2>📬 Student Mess Requests</h2>
      {loading ? (
        <p className="loading">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="no-requests">No pending requests</p>
      ) : (
        <div className="scroll-card-wrapper">
          {requests.map(({ student, status }) => (
            <div className={`student-card ${status.toLowerCase()}`} key={student._id}>
              <div className="student-header">
                <h4>{student.fullName}</h4>
                <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
              </div>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>College:</strong> {student.college}</p>
              <p><strong>Location:</strong> {student.address?.city}, {student.address?.state}</p>

              {status === "Pending" && (
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(student._id)}
                  disabled={accepting === student._id}
                >
                  {accepting === student._id ? "Accepting..." : "Accept Request"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessRequest;
