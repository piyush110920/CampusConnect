import React from 'react';
import './StudentInfo.css';
import studentImg from '../../assets/img1.png';
import Typewriter from 'typewriter-effect';

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
          <p>🔹 New here? <a href="#" className="link">[Sign Up as Student]</a></p>
          <p>🔹 Already have an account? <a href="#" className="link">[Sign In]</a></p>
        </div>
      </div>

      {/* Right Image */}
      <div className="student-info-image">
        <img src={studentImg} alt="Student Illustration" />
      </div>
    </div>
  );
};

export default StudentInfo;
