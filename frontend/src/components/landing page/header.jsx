// File: src/components/landing page/header.jsx
import React from "react";
import logo from "../../assets/CampusConnect logo.png";
import "./header.css";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="nav-links">
        <Link to="/signup">
        <button className="nav-login-button">SignUP</button>
        </Link>
        <button className="nav-login-button">SignIN</button>
      </div>
    </div>
  );
};

export default Header;
