import React, { useState } from 'react';
import logo from '../../../assets/CampusConnect logo.png';
import profileImg from '../../../assets/profileImage.png';
import './MessNavbar.css';

const MessNavbar = ({ hideWelcomeText }) => {
  return (
    <nav className="navbar-login">
      <div className="login-navbar-logo">
        <img src={logo} alt="Campus Connect" />
      </div>
      {!hideWelcomeText && (
        <div className="welcome-text">
          <h3>Welcome Admin</h3>
        </div>
      )}
      <div className="profile-image">
        <img src={profileImg} alt="Profile" />
      </div>
    </nav>
  );
};

export default MessNavbar;