import React, { useEffect, useState } from "react";
import './Services.css';

import {
  fetchStudentProfile,
  rateSelectedMess,
  sendMessMessage
} from '../../../services/api';

const MessServices = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);           // ✅ for message
  const [submittingRating, setSubmittingRating] = useState(false); // ✅ for rating

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
        setRating(data.selectedMessRating || 0);
        setAvgRating(data.selectedMess?.averageRating || 0);
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
    setSubmittingRating(true); // ✅
    try {
      const token = localStorage.getItem("token");
      const result = await rateSelectedMess(token, rating);
      setAvgRating(result.averageRating);
      alert("Rating submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating.");
    } finally {
      setSubmittingRating(false); // ✅
    }
  };

  const handleSendMessage = async () => {
    setSending(true); // ✅
    try {
      const token = localStorage.getItem("token");
      await sendMessMessage(token, message);
      alert("Message sent successfully!");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to send message");
    } finally {
      setSending(false); // ✅
    }
  };

  return (
    <div className="service-container">
      <h3 className="service-title">Current Mess Service</h3>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : student?.selectedMess ? (
        <div className="card-wrapper">

          {/* Info Card */}
          <div className="info-card">
            <p><strong>Service Name:</strong> {student.selectedMess.companyName}</p>
            <p><strong>Service Provider:</strong> {student.selectedMess.fullName}</p>
            <p><strong>Contact Number:</strong> {student.selectedMess.phone}</p>
            <p><strong>Location:</strong> {student.selectedMess.address?.area}, {student.selectedMess.address?.city}</p>
            <p><strong>Date of Joining:</strong> {formatDate(student.selectedMessDate)}</p>
            <p><strong>Date of Due:</strong> {getDueDate(student.selectedMessDate)}</p>
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
                disabled={sending || !message.trim()} // ✅ disable if sending or message is empty
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>

          {/* Rating Card */}
          <div className="rating-card">
            <h4>Rate This Mess</h4>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            />
            <button
              onClick={handleRatingSubmit}
              disabled={submittingRating} // ✅
            >
              {submittingRating ? "Submitting..." : "Submit Rating"}
            </button>
            <p>Average Rating: ⭐ {avgRating?.toFixed(1) || "0.0"}</p>
          </div>

        </div>
      ) : (
        <p style={{ padding: "1rem" }}>No mess selected yet.</p>
      )}
    </div>
  );
};

export default MessServices;
