// loginNavbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CampusConnect logo.png';
import './loginNavbar.css';

const LoginNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="login-navbar">
      <div className="login-navbar-logo">
        <img src={logo} alt="Campus Connect Logo" />
      </div>

      {/* Hamburger Toggle */}
      <div className="login-navbar-toggle" onClick={handleToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <ul className={`login-navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/landing#about">About</Link></li>
        <li><a href="/landing#ContactUs">Contact Us</a></li>
        <li><Link to="/signup" className="signup-link">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default LoginNavbar;
