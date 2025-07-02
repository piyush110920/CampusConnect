import React, { useEffect, useState } from 'react';
import './Services.css';
import { fetchStudentProfile } from '../../../services/api';

const RoomServices = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchStudentProfile(token)
      .then(data => {
        setStudent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getDueDate = (startDateStr) => {
    const start = new Date(startDateStr);
    const due = new Date(start.setMonth(start.getMonth() + 1));
    return due.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (loading) return <p>Loading...</p>;
  if (!student?.selectedRoom) return <p>No room selected.</p>;

  const room = student.selectedRoom;
  const joinDate = student.selectedRoomDate ? formatDate(student.selectedRoomDate) : 'N/A';
  const dueDate = student.selectedRoomDate ? getDueDate(student.selectedRoomDate) : 'N/A';

  return (
    <div className="service-container">
      <h3 className="service-title">Current Room Service</h3>

      <div className="card-wrapper">
        <div className="info-card">
          <p><strong>Service Name:</strong> {room.messName}</p>
          <p><strong>Service Provider:</strong> {room.fullName}</p>
          <p><strong>Contact Number:</strong> {room.phone}</p>
          <p><strong>Location:</strong> {room.address?.plotNumber}, {room.address?.street}, {room.address?.city}</p>
          <p><strong>Date of Joining:</strong> {joinDate}</p>
          <p><strong>Date of Due:</strong> {dueDate}</p>
        </div>

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
    </div>
  );
};

export default RoomServices;
