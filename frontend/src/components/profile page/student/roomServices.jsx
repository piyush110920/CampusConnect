import React from 'react';
import './Services.css';

const RoomServices = () => {
  return (
    <div className="service-container">
      <h3 className="service-title">CURRENT ROOM SERVICE</h3>
      <div className="service-info">
        <p><strong>SERVICE NAME:</strong> Room Paradise</p>
        <p><strong>SERVICE PROVIDER NAME:</strong> John Doe</p>
        <p><strong>CONTACT NUMBER:</strong> +91-9876543210</p>
        <p><strong>LOCATION:</strong> Plot 23, ABC Street, Pune</p>
        <p><strong>DATE OF JOINING:</strong> 01 Jan 2024</p>
        <p><strong>DATE OF DUE:</strong> 01 Jan 2025</p>
        <div classname="Message box">
        <p><strong>DROP MESSAGE:</strong></p>
        <textarea rows="4" placeholder="Write your message here..."></textarea>
        </div>
        <div className="service-buttons">
          <button className="send">SEND</button>
          <button className="change">CHANGE</button>
          <button className="remove">REMOVE</button>
        </div>
      </div>
    </div>
  );
};

export default RoomServices;
