// landing.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Typewriter from "typewriter-effect";
import Particle from "../particle";
import Header from "./header";
import Footer from "./footer";
import ServicedBy from './ServicedBy';
import StudentInfo from "./studentInfo";
import MessInfo from "./messInfo";
import ContactUs from "./contactUs";
import RoomInfo from "./roomInfo";

import girlImage from "../../assets/img2.png";
import "./landing.css";

const LandingPage = () => {
  const location = useLocation();

  // 🔁 Scroll to hash section when URL changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
      <Header />

      {/* Optional Floating Bubbles */}
      <div className="bubbles">
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 6}px`,
              height: `${Math.random() * 12 + 6}px`,
              animationDuration: `${Math.random() * 10 + 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="landing-container">
        <Particle />
        <div className="landing-text">
          <h1>🏠 Welcome to <span>CampusConnect!</span></h1>
          <h2 className="static-text">Your One-Stop Solution for</h2>
          <div className="typewriter">
            <Typewriter
              options={{
                strings: ["Students", "Mess Providers", "Rental Services"],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </div>
          <p>
            CampusConnect is your ultimate digital hub built exclusively for students and service providers.
          </p>
        </div>

        <div className="landing-image">
          <img src={girlImage} alt="Illustration" />
        </div>
      </div>

      {/* Sections */}
      <ServicedBy />
      <div id="about">
        <StudentInfo />
      </div>
      
      <MessInfo />
      <RoomInfo />

      <div id="ContactUs">
        <ContactUs />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
