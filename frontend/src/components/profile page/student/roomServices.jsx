import React from 'react';
import './Services.css';

const RoomServices = () => {
  return (
    <div className="service-container">
      <h3 className="service-title">Current Room Service</h3>

      <div className="card-wrapper">
        {/* Info Card */}
        <div className="info-card">
          <p><strong>Service Name:</strong> Room Paradise</p>
          <p><strong>Service Provider:</strong> John Doe</p>
          <p><strong>Contact Number:</strong> +91-9876543210</p>
          <p><strong>Location:</strong> Plot 23, ABC Street, Pune</p>
          <p><strong>Date of Joining:</strong> 01 Jan 2024</p>
          <p><strong>Date of Due:</strong> 01 Jan 2025</p>
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

export default RoomServices;
