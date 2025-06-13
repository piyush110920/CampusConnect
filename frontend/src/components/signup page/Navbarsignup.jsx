import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CampusConnect logo.png';
import './Navbarsignup.css';

const Navbar = () => {
  return (
    <nav className="signup-navbar">
      <div className="signup-navbar-logo">
        <img src={logo} alt="Campus Connect Logo" />
      </div>
      <ul className="signup-navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
