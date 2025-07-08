import React, { useEffect, useState } from 'react';
import './MessConnectedPeople.css';

const MessConnectedPeople = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Sample mock student data (replace or expand as needed)
    const mockStudents = [
      {
        _id: '1',
        fullName: 'Ravi Sharma',
        email: 'ravi.sharma@example.com',
        college: 'IIT Bombay',
        address: { city: 'Mumbai', state: 'Maharashtra' },
      },
      {
        _id: '2',
        fullName: 'Ananya Verma',
        email: 'ananya.verma@example.com',
        college: 'NIT Trichy',
        address: { city: 'Tiruchirappalli', state: 'Tamil Nadu' },
      },
      {
        _id: '3',
        fullName: 'Rahul Mehta',
        email: 'rahul.mehta@example.com',
        college: 'BITS Pilani',
        address: { city: 'Pilani', state: 'Rajasthan' },
      },
    ];

    // Simulate data fetch
    setTimeout(() => {
      setStudents(mockStudents);
    }, 500);
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
            <p><strong>Location:</strong> {student.address?.city}, {student.address?.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessConnectedPeople;
