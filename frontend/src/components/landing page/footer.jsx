import React from "react";
import "./Footer.css";
import logo from "../../assets/CampusConnect logo.png";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        {/* Left: Logo and Socials */}
        <div className="footer-left">
          <img src={logo} alt="Campus Connect Logo" className="footer-logo" />
          <div className="footer-socials">
            <FaFacebookF />
            <FaLinkedinIn />
            <FaInstagram />
          </div>
        </div>

        {/* Center: Contact Info */}
        <div className="footer-center">
          <p><FaEnvelope /> info@campusconnect.com</p>
          <button className="map-button">
            <FaMapMarkerAlt /> Find Us On Map
          </button>
        </div>

        {/* Right: Address */}
        <div className="footer-right">
          <p>
            Plot number XX, near XYZ,<br />
            ABC Road, City,<br />
            State, Country - 000000
          </p>
        </div>
      </div>

      <hr className="footer-line" />

      {/* Bottom Links */}
      <div className="footer-links">
        <div>
          <h4>Sign Up</h4>
          <p>Student Sign Up</p>
          <p>Mess Sign Up</p>
          <p>Room Sign Up</p>
        </div>
        <div>
          <h4>Login</h4>
          <p>Student Login</p>
          <p>Mess Login</p>
          <p>Room Login</p>
        </div>
        <div>
          <h4>Explore</h4>
          <p>Contact Us</p>
          <p>CampusINTELLIGENCE</p>
          <p>Find Us</p>
        </div>
      </div>

      <hr className="footer-line" />

      <div className="footer-bottom">
        <p>© 2025 — Campus Connect. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
