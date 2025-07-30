import React, { useEffect, useState } from 'react';
import './MessConnectedPeople.css';
import { fetchConnectedMessStudents } from '../../../services/api';

const ConnectedPeople = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchConnectedMessStudents(token)
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching connected students:", err);
        setLoading(false);
      });
  }, []);

  const formatDueDate = (startDate) => {
    if (!startDate) return "N/A";

    const date = new Date(startDate);
    date.setMonth(date.getMonth() + 1); // Add 1 month

    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mess-request-container">
      <h2>👥 Connected Students</h2>

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
              <p><strong>Phone number:</strong> {student.phoneNumber}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>College:</strong> {student.college}</p>
              <p><strong>Location:</strong> {"Plot Number "}{student.address.plotNumber}, {student.address.landmark}, {student.address.area}, {student.address.city}, {student.address.state}, {student.address.country}{"-"}{student.address.pinCode}</p>
              <p><strong>Due Date:</strong> {formatDueDate(student.selectedMessDate)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectedPeople;
