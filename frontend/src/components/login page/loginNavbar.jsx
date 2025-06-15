
// loginNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CampusConnect logo.png';
import './loginNavbar.css';

const LoginNavbar = () => {
  return (
    <nav className="login-navbar">
      <div className="login-navbar-logo">
        <img src={logo} alt="Campus Connect Logo" />
      </div>
      <ul className="login-navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/landing#about">About</Link></li>
        <li><a href="/landing#ContactUs">Contact Us</a></li>
        <li><Link to="/signup" className="signup-link">Sign Up</Link></li> 
      </ul>
    </nav>
  );
};

export default LoginNavbar;

