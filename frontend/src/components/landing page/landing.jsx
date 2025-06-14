import React from "react";
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
  return (
    <div>
      <Header />

      {/* Floating Bubbles */}
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

        {/* Text Section */}
        <div className="landing-text">
          <h1>🏠 Welcome to <span>CampusConnect!</span></h1>

          <h2 className="static-text">Your One-Stop Solution for</h2>
          <div className="typewriter">
            <Typewriter
              options={{
                strings: [
                  "Students",
                  "Mess Providers",
                  "Rental Services",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </div>

          <p>
            CampusConnect is your ultimate digital hub built exclusively for
            students and service providers. Whether you’re a student new to town,
            a mess provider looking to grow, or a room rental owner wanting to fill up
            vacant spaces—CampusConnect brings you all together in one smart, real-time platform.
          </p>
        </div>

        {/* Image Section */}
        <div className="landing-image">
          <img src={girlImage} alt="Illustration" />
        </div>
      </div>

      {/* Sections */}
      <ServicedBy />
      <StudentInfo />
      <MessInfo />
      <RoomInfo />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
