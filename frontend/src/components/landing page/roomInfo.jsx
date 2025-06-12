import React from 'react';
import './roomInfo.css';
import roomImage from '../../assets/home.png'; // Update path to your room image

const RoomInfo = () => {
  return (
    <div className="room-info-container">
      <div className="room-info-text">
        <h2 className="room-heading">
          🏡 For Room Rent Service Providers
        </h2>
        <p className="room-subtext">
          List your vacant rooms and PGs to connect with students!
          <br />
          <span>CampusConnect allows you to:</span>
        </p>
        <ul className="room-features">
          <li>✅ <strong>Add multiple rooms with amenities & pricing</strong></li>
          <li>✅ <strong>Get rated by tenants</strong></li>
          <li>✅ <strong>Manage bookings seamlessly</strong></li>
        </ul>
        <p className="room-auth-links">
          🔹 Register your property today! <span className="link">[Sign Up as Room Service]</span><br />
          🔹 Returning user? <span className="link">[Sign In]</span>
        </p>
      </div>

      <div className="room-info-image">
        <img src={roomImage} alt="Room Service Illustration" />
      </div>
    </div>
  );
};

export default RoomInfo;
