import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CampusConnect logo.png';
import './Navbarsignup.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="signup-navbar">
      <div className="signup-navbar-logo">
        <img src={logo} alt="Campus Connect Logo" />
      </div>

      {/* Hamburger Toggle */}
      <div className="signup-navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`signup-navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/landing#about">About</Link></li>
        <li><a href="/landing#ContactUs">Contact Us</a></li>
        <li><Link to="/login" className="login-link">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
