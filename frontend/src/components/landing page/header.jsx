// File: src/components/landing page/header.jsx
import React from "react";
import logo from "../../assets/CampusConnect logo.png";
import "./header.css";

const Header = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="logo-img" />
        <span className="brand-text">Campus Connect</span>
      </div>
      <div className="nav-links">
        <button className="nav-login-button">SignUP</button>
        <button className="nav-login-button">SignIN</button>
      </div>
    </div>
  );
};

export default Header;
