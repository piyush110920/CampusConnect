import React, { useEffect, useState } from 'react';
import './MessRequest.css';

const MessRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(null);

  useEffect(() => {
    // Simulate a delay and mock fetch
    const mockRequests = [
      {
        student: {
          _id: 's1',
          fullName: 'Aman Gupta',
          email: 'aman.gupta@example.com',
          college: 'IIT Delhi',
          address: { city: 'New Delhi', state: 'Delhi' },
        },
        status: 'Pending',
      },
      {
        student: {
          _id: 's2',
          fullName: 'Sneha Reddy',
          email: 'sneha.reddy@example.com',
          college: 'NIT Warangal',
          address: { city: 'Warangal', state: 'Telangana' },
        },
        status: 'Pending',
      },
    ];

    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 500);
  }, []);

  const handleAccept = async (studentId) => {
    setAccepting(studentId);

    // Simulate a network delay and update
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) =>
          r.student._id === studentId ? { ...r, status: 'Accepted' } : r
        )
      );
      setAccepting(null);
    }, 800);
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

              {status === 'Pending' && (
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(student._id)}
                  disabled={accepting === student._id}
                >
                  {accepting === student._id ? 'Accepting...' : 'Accept Request'}
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
