import React from 'react';
import './StudentInfo.css';
import studentImg from '../../assets/img1.png'; // Place the image here

const StudentInfo = () => {
  return (
    <div className="student-info-container">
      {/* Left Text Content */}
      <div className="student-info-text">
        <h2 className="student-heading">
          🎓 For Students
        </h2>
        <p className="student-description">
          Looking for a comfortable room and a delicious tiffin service within your budget? <br />
          <strong>CampusConnect</strong> helps students find verified rental rooms and reliable mess services based on location, ratings, and price.
        </p>
        <ul className="student-features">
          <li>✅ Compare room rentals & mess plans</li>
          <li>✅ Read reviews & ratings</li>
          <li>✅ Book instantly in real-time</li>
        </ul>
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
