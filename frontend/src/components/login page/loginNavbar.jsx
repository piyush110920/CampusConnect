import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CampusConnect logo.png';
import './loginNavbar.css';

const LoginNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar-login">
      {/* Logo */}
      <div className="login-navbar-logo">
        <img src={logo} alt="Campus Connect Logo" />
      </div>

      {/* Hamburger Toggle */}
      <div
        className={`login-navbar-toggle ${menuOpen ? 'active' : ''}`}
        onClick={handleToggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <ul className={`login-navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/landing#about" onClick={closeMenu}>About</Link></li>
        <li><a href="/landing#ContactUs" onClick={closeMenu}>Contact Us</a></li>
        <li><Link to="/signup" onClick={closeMenu}>Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default LoginNavbar;
