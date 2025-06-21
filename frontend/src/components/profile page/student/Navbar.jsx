
import React from 'react';
import './Navbar.css';
import logo from '../../../assets/CampusConnect logo.png';
import profileImg from '../../../assets/profileImage.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Campus Connect" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <span className="welcome-text">&lt;- Welcome <span style={{ color: 'lightgreen' }}>Admin</span></span>
        <img src={profileImg} alt="Profile" className="navbar-profile" />
      </div>
    </nav>
  );
};

export default Navbar;

