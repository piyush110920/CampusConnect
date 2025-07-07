import React, { useEffect, useState } from 'react';
import './Services.css';
import { fetchStudentProfile, rateSelectedRoom, sendRoomMessage } from '../../../services/api';

const RoomServices = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);       // ✅ For sending message
  const [submittingRating, setSubmittingRating] = useState(false); // ✅ For submitting rating

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
    setSubmittingRating(true); // ✅ Start loading
    try {
      const token = localStorage.getItem("token");
      const result = await rateSelectedRoom(token, rating);
      setAvgRating(result.averageRating);
      alert("Rating submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating.");
    } finally {
      setSubmittingRating(false); // ✅ End loading
    }
  };

  const handleSendMessage = async () => {
    setSending(true); // ✅ Start sending
    try {
      const token = localStorage.getItem("token");
      await sendRoomMessage(token, message);
      alert("Message sent successfully!");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setSending(false); // ✅ End sending
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
            <p><strong>Room name:</strong> {student.selectedRoom.messName}</p>
            <p><strong>Service Provider:</strong> {student.selectedRoom.fullName}</p>
            <p><strong>Contact Number:</strong> {student.selectedRoom.phone}</p>
            <p><strong>Location:</strong> {student.selectedRoom.address?.area}, {student.selectedRoom.address?.city}</p>
            <p><strong>Date of Joining:</strong> {formatDate(student.selectedRoomDate)}</p>
            <p><strong>Date of Due:</strong> {getDueDate(student.selectedRoomDate)}</p>
          </div>

          {/* Message Card */}
          <div className="message-card">
            <h4>Drop Message</h4>
            <textarea
              rows="6"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="service-buttons">
              <button
                className="send"
                onClick={handleSendMessage}
                disabled={sending || !message.trim()} // ✅ Disable if sending or empty
              >
                {sending ? "Sending..." : "Send"}
              </button>

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
            <button
              onClick={handleRatingSubmit}
              disabled={submittingRating}
            >
              {submittingRating ? "Submitting..." : "Submit Rating"}
            </button>
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
