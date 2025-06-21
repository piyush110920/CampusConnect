import React from 'react';
import './Services.css';

const MessServices = () => {
  return (
    <div className="service-container">
      <h3 className="service-title">CURRENT MESS SERVICE</h3>
      <div className="service-info">
        <p><strong>SERVICE NAME:</strong> Tasty Bites</p>
        <p><strong>SERVICE PROVIDER NAME:</strong> Priya Mess</p>
        <p><strong>CONTACT NUMBER:</strong> +91-9123456780</p>
        <p><strong>LOCATION:</strong> Lane 5, Near XYZ Chowk, Nagpur</p>
        <p><strong>DATE OF JOINING:</strong> 01 Feb 2024</p>
        <p><strong>DATE OF DUE:</strong> 01 Feb 2025</p>
        <p><strong>DROP MESSAGE:</strong></p>
        <textarea rows="4" placeholder="Write your message here..."></textarea>
        <div className="service-buttons">
          <button className="send">SEND</button>
          <button className="change">CHANGE</button>
          <button className="remove">REMOVE</button>
        </div>
      </div>
    </div>
  );
};

export default MessServices;
