import React from 'react';
import './StudentInfo.css';
import studentImg from '../../assets/img2.png';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';

const StudentInfo = () => {
  const features = [
    "✅ Compare room rentals & mess plans",
    "✅ Read reviews & ratings",
    "✅ Book instantly in real-time"
  ];

  return (
    <div className="student-info-container">
      {/* Left Text Content */}
      <div className="student-info-text">
        <h2 className="student-heading">🎓 For Students</h2>
        <p className="student-description">
          Looking for a comfortable room and a delicious tiffin service within your budget? <br />
          <strong>CampusConnect</strong> helps students find verified rental rooms and reliable mess services based on location, ratings, and price.
        </p>

        <div className="student-features typewriter">
          <Typewriter
            options={{
              strings: features,
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              delay: 50,
            }}
          />
        </div>
            

        <div className="student-links">
          <p>🔹 New here? <Link to="/signup" className="link">[Sign Up as Student]</Link></p>
          <p>🔹 Already have an account? <Link to="/login" className="link">[Sign In]</Link></p>
        </div>
      </div>

      {/* Right Image */}
      <div className="student-info-image">
        <div className="image-wrapper">
          <img src={studentImg} alt="Student Info" />
          <div className="image-popup">
            🎓 Access mess & rental services with real-time ratings, booking, and comparison!
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
