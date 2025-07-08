import React, { useEffect, useState } from 'react';
import './MessConnectedPeople.css';
import { fetchConnectedStudents } from '../../../services/api';

const MessConnectedPeople = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchConnectedStudents(token).then(setStudents).catch(console.error);
  }, []);

  return (
    <div className="connected-people-container">
      <h2>🤝 Connected Students</h2>
      <div className="connected-grid">
        {students.map(student => (
          <div className="connected-card" key={student._id}>
            <h4>{student.fullName}</h4>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>College:</strong> {student.college}</p>
            <p><strong>Location:</strong> {student.address.city}, {student.address.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessConnectedPeople;
