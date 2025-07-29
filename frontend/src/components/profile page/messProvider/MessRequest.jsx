import React, { useEffect, useState } from 'react';
import './MessRequest.css';
import { fetchMessRequests, acceptMessRequest } from '../../../services/api';

const MessRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchMessRequests(token)
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading requests:", err);
        setError("Failed to load requests.");
        setLoading(false);
      });
  }, []);

  const handleAccept = async (studentId) => {
    setAccepting(studentId);
    const token = localStorage.getItem("token");

    try {
      await acceptMessRequest(token, studentId);
      setRequests(prev =>
        prev.map(r =>
          r.student._id === studentId ? { ...r, status: "Accepted" } : r
        )
      );
    } catch (err) {
      console.error("Accept failed:", err);
      alert("Failed to accept request.");
    } finally {
      setAccepting(null);
    }
  };

  return (
    <div className="mess-request-container">
      <h2>📬 Student Mess Requests</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : requests.length === 0 ? (
        <p className="no-requests">No pending requests</p>
      ) : (
        <div className="scroll-card-wrapper">
          {requests.map(({ _id, student, status }) => (
            <div key={_id} className={`student-card ${status.toLowerCase()}`}>
              <div className="student-header">
                <h4>{student.fullName}</h4>
                <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
              </div>

              <p><strong>College:</strong> {student.college}</p>
              <p><strong>Location:</strong> {"Plot Number "}{student.address.plotNumber}, {student.address.landmark}, {student.address.area}, {student.address.city}, {student.address.state}, {student.address.country}{"-"}{student.address.pinCode}</p>


              {status === "Pending" && (
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(student._id)}
                  disabled={accepting === student._id}
                >
                  {accepting === student._id ? "Accepting..." : "Accept"}
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
