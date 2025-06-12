// landing.jsx
import React from "react";
import Header from "./header"; // relative import
import girlImage from "../../assets/img1.png";
import "./landing.css"; // if you’ve created separate CSS

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="landing-container">
        <div className="landing-text">
          <h1>🏠 Welcome to <br /><span>CampusConnect!</span></h1>
          <h2><em>Your One-Stop Solution for Students, Mess Providers & Rental Services</em></h2>
          <p>
            CampusConnect is your ultimate digital hub built exclusively for
            students and service providers. Whether you’re a student new to town,
            a mess provider looking to grow, or a room rental owner wanting to fill up
            vacant spaces—CampusConnect brings you all together in one smart, real-time platform.
          </p>
        </div>
        <div className="landing-image">
          <img src={girlImage} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
