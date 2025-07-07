import React, { useEffect, useState } from "react";
import './MessUpdates.css';

const MessUpdates = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/mess/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="mess-updates-container">
      <h2 className="updates-title">📬 Student Messages</h2>

      {loading ? (
        <p className="status-msg">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="status-msg">No messages yet.</p>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg._id} className="update-card">
              <div className="update-header">
                <span><strong>From:</strong> {msg.studentName}</span>
                <span className="timestamp">{new Date(msg.createdAt).toLocaleString()}</span>
              </div> 
              <div className="update-body">
                <p><strong>Contact:</strong> {msg.studentPhone}</p>
                <p className="message-text">“{msg.message}”</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessUpdates;
