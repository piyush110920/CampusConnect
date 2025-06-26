// src/components/landing.jsx
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
import img1 from '../../assets/img1.png';
import bgImage from '../../assets/home-bg.jpg'; // ✅ imported background image

import "./landing.css";

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    // ✅ Set background image dynamically
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center center';

    return () => {
      // Cleanup on unmount
      document.body.style.backgroundImage = '';
    };
  }, []);

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

      {/* Floating Bubble Animation */}
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
          <img src={img1} alt="Student Services" />
          <div className="image-popup">
            🚀 Empowering students with smart mess & rental solutions, at your fingertips!
          </div>
        </div>
      </div>

      {/* Info Sections */}
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
