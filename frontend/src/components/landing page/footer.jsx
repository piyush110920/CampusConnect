import React from "react";
import "./footer.css";
import logo from "../../assets/CampusConnect logo.png";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={logo} alt="Campus Connect Logo" className="footer-logo" />
        </div>

        <div className="footer-contact">
          <p><FaEnvelope /> info@campusconnect.com</p>
          <p><FaMapMarkerAlt /> find us on map</p>
        </div>

        <div className="footer-address">
          <p>plot number xx, near xyz,<br />abc road, city,<br />state, country - xxxxxx</p>
        </div>

        <div className="footer-socials">
          <FaFacebookF />
          <FaLinkedinIn />
          <FaInstagram />
        </div>
      </div>

      <hr className="footer-line" />

      <div className="footer-links">
        <div>
          <p>Student sign up</p>
          <p>Mess sign up</p>
          <p>Room sign up</p>
        </div>
        <div>
          <p>Student login</p>
          <p>Mess login</p>
          <p>Room login</p>
        </div>
        <div>
          <p>Contact us</p>
          <p>CampusINTELLIGENCE</p>
          <p>Find us</p>
        </div>
      </div>

      <hr className="footer-line" />

      <div className="footer-bottom">
        <p>2025 - Campus Connect - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
