// File: src/components/landing page/header.jsx
import React from "react";
import logo from "../../assets/CampusConnect logo.png";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="CampusConnect Logo" className="header-logo" />
        <span className="brand-name">CampusConnect</span>
      </div>
      <div className="header-right">
        <button className="header-btn">Sign Up</button>
        <button className="header-btn">Sign In</button>
      </div>
    </header>
  );
};

export default Header;
