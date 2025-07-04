import React, { useEffect, useState } from "react";
import './MessUpdates.css';

const dummyMessages = [
  { id: 1, message: "MSG FROM XYZ" },
  { id: 2, message: "MSG FROM ABS" },
  { id: 3, message: "MSG FROM USER" },
];

const MessUpdates = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulate fetching from backend
    // Later replace this with actual API call
    setMessages(dummyMessages);
  }, []);

  return (
    <div className="mess-updates-container">
      {messages.length === 0 ? (
        <p className="no-msg">No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="update-box">
            <p className="update-msg">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MessUpdates;
