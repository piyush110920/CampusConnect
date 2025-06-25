import React from 'react';
import './Services.css';

const MessServices = () => {
  return (
    <div className="service-container">
      <h3 className="service-title">Current Mess Service</h3>

      <div className="card-wrapper">
        {/* Info Card */}
        <div className="info-card">
          <p><strong>Service Name:</strong> Tasty Bites</p>
          <p><strong>Service Provider:</strong> Priya Mess</p>
          <p><strong>Contact Number:</strong> +91-9123456780</p>
          <p><strong>Location:</strong> Lane 5, Near XYZ Chowk, Nagpur</p>
          <p><strong>Date of Joining:</strong> 01 Feb 2024</p>
          <p><strong>Date of Due:</strong> 01 Feb 2025</p>
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
      </div>
    </div>
  );
};

export default MessServices;
