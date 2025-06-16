import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CampusConnect logo.png';
import './Navbarsignup.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="signup-navbar">
      <div className="signup-navbar-logo">
        <img src={logo} alt="Campus Connect Logo" />
      </div>

      {/* Hamburger Toggle */}
      <div
        className={`signup-navbar-toggle ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`signup-navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/landing#about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><a href="/landing#ContactUs" onClick={() => setMenuOpen(false)}>Contact Us</a></li>
        <li><Link to="/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
