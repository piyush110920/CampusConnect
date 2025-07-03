import React from "react";
import { Link } from "react-router-dom"; // Import for internal links
import "./Footer.css";
import logo from "../../assets/CampusConnect logo.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>

      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-left">
          <img src={logo} alt="Campus Connect Logo" className="footer-logo" />
          <div className="footer-socials">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-center">
          <p><FaEnvelope /> info@campusconnect.com</p>
          <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
            <button className="map-button"><FaMapMarkerAlt /> Find Us On Map</button>
          </a>
        </div>

        <div className="footer-right">
          <p>
            Plot number 01, near Grahak Seva Kendra,<br />
            Vaishali nagar,Jaitala Road, Nagpur,<br />
            Maharashtra, India - 440016
          </p>
        </div>
      </div>

      <hr className="footer-line" />

      {/* Footer Links */}
      <div className="footer-links">
        <div>
          <h4>Sign Up</h4>
          <p><Link to="/signup?role=student">Student Sign Up</Link></p>
          <p><Link to="/signup?role=mess">Mess Sign Up</Link></p>
          <p><Link to="/signup?role=room">Room Sign Up</Link></p>
        </div>
        <div>
          <h4>Login</h4>
          <p><Link to="/login?role=student">Student Login</Link></p>
          <p><Link to="/login?role=mess">Mess Login</Link></p>
          <p><Link to="/login?role=room">Room Login</Link></p>
        </div>
        <div>
          <h4>Explore</h4>
          <p><Link to="/#ContactUs">Contact Us</Link></p>
          <p><Link to="/intelligence">CampusINTELLIGENCE</Link></p>
          <p><a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Find Us</a></p>
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
