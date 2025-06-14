import React from 'react';
import Typewriter from 'typewriter-effect';
import './roomInfo.css';
import roomImage from '../../assets/home.png';

const RoomInfo = () => {
  return (
    <div className="room-info-container">
      <div className="room-info-text">
        <h2 className="room-heading">
          🏡 For Room Rent Service Providers
        </h2>
        <p className="room-subtext">
          List your vacant rooms and PGs to connect with students! <b>CampusConnect</b> allows you to:<br />
          
        </p>

        {/* ✅ Typewriter starts here */}
        <div className="room-features">
          <Typewriter
            options={{
              strings: [
                '✅ Add multiple rooms with amenities & pricing',
                '✅ Get rated by tenants',
                '✅ Manage bookings seamlessly'
              ],
              autoStart: true,
              loop: true,
              delay: 40,
              deleteSpeed: 20,
              pauseFor: 2000
            }}
          />
        </div>

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
