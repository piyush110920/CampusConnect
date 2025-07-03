import React, { useEffect, useState } from 'react';
import './Services.css';
import { fetchStudentProfile, rateSelectedRoom } from '../../../services/api';

const RoomServices = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

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
        setRating(data.selectedRoomRating || 0);
        setAvgRating(data.selectedRoom?.averageRating || 0);
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

  const handleRatingSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await rateSelectedRoom(token, rating);
      setAvgRating(result.averageRating);
      alert("Rating submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="service-container">
      <h3 className="service-title">Current Room Service</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : student?.selectedRoom ? (
        <div className="card-wrapper">

          {/* Info Card */}
          <div className="info-card">
            <p><strong>Service Name:</strong> {student.selectedRoom.companyName}</p>
            <p><strong>Service Provider:</strong> {student.selectedRoom.fullName}</p>
            <p><strong>Contact Number:</strong> {student.selectedRoom.phone}</p>
            <p><strong>Location:</strong> {student.selectedRoom.address?.area}, {student.selectedRoom.address?.city}</p>
            <p><strong>Date of Joining:</strong> {formatDate(student.selectedRoomDate)}</p>
            <p><strong>Date of Due:</strong> {getDueDate(student.selectedRoomDate)}</p>
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

          {/* Rating Card */}
          <div className="rating-card">
            <h4>Rate This Room</h4>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
            <button onClick={handleRatingSubmit}>Submit Rating</button>
            <p>Average Rating: ⭐ {avgRating?.toFixed(1) || "0.0"}</p>
          </div>

        </div>
      ) : (
        <p style={{ padding: "1rem" }}>No room selected yet.</p>
      )}
    </div>
  );
};

export default RoomServices;
