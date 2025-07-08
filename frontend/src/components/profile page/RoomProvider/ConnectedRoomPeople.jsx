import React, { useEffect, useState } from 'react';
import './MessConnectedPeople.css'; // ✅ Same CSS works
import { fetchConnectedRoomStudents } from '../../../services/api';

const ConnectedRoomPeople = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchConnectedRoomStudents(token)
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching connected room students:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mess-request-container">
      <h2>🏠 Connected Room Students</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : students.length === 0 ? (
        <p className="no-requests">No students connected yet</p>
      ) : (
        <div className="scroll-card-wrapper">
          {students.map(student => (
            <div key={student._id} className="student-card accepted">
              <div className="student-header">
                <h4>{student.fullName}</h4>
                <span className="status-badge accepted">Accepted</span>
              </div>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>College:</strong> {student.college}</p>
              <p><strong>Location:</strong> {student.address.city}, {student.address.state}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectedRoomPeople;
