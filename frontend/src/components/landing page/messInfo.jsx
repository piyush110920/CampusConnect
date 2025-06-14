import React from 'react';
import Typewriter from 'typewriter-effect';
import './MessInfo.css';
import messImg from '../../assets/img3.png';

const MessInfo = () => {
  const messFeatures = [
    "✅ List their service with photos, rates & menu",
    "✅ Get visibility with student reviews",
    "✅ Manage orders in real-time"
  ];

  return (
    <div className="mess-info-container">
      {/* Left Image */}
      <div className="mess-info-image">
        <img src={messImg} alt="Mess Provider Illustration" />
      </div>

      {/* Right Text Content */}
      <div className="mess-info-text">
        <h2 className="mess-heading">🍽️ For Mess / Tiffin Service Providers</h2>

        <p className="mess-description">
          Reach hundreds of students in your city! <br />
          With <strong>CampusConnect</strong>, mess providers can:
        </p>

        <div className="mess-features typewriter">
          <Typewriter
            options={{
              strings: messFeatures,
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 50,
            }}
          />
        </div>

        <div className="mess-links">
          <p>🔹 Want to join as a provider? <a href="#" className="link">[Sign Up as Mess Service]</a></p>
          <p>🔹 Already onboard? <a href="#" className="link">[Sign In]</a></p>
        </div>
      </div>
    </div>
  );
};

export default MessInfo;
