// File: src/components/landing page/header.jsx
import React from "react";
import logo from "../../assets/CampusConnect logo.png";
import "./header.css";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="CampusConnect Logo" className="header-logo" />
        
      </div>
      <div className="header-right">
        <Link to="/signup">
          <button className="header-btn">SignUP</button>
        </Link>
        <Link to="/login">
          <button className="header-btn">SignIN</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
