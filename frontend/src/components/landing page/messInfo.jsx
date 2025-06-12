import React from 'react';
import './MessInfo.css';
import messImg from '../../assets/img3.png'; // Use the uploaded image here

const MessInfo = () => {
  return (
    <div className="mess-info-container">
      {/* Left Image */}
      <div className="mess-info-image">
        <img src={messImg} alt="Mess Provider Illustration" />
      </div>

      {/* Right Text Content */}
      <div className="mess-info-text">
        <div classname="heading">
          <h2 className="mess-heading">
            🍽️ For Mess / Tiffin Service Providers
          </h2>
        </div>
        <div>
        <p className="mess-description">
          Reach hundreds of students in your city! <br />
          With <strong>CampusConnect</strong>, mess providers can:
        </p>
        <ul className="mess-features">
          <li>✅ List their service with photos, rates & menu</li>
          <li>✅ Get visibility with student reviews</li>
          <li>✅ Manage orders in real-time</li>
        </ul>
        <div className="mess-links">
          <p>🔹 Want to join as a provider? <a href="#" className="link">[Sign Up as Mess Service]</a></p>
          <p>🔹 Already onboard? <a href="#" className="link">[Sign In]</a></p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MessInfo;
