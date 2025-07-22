import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomNavbar.css';
import logo from '../../../assets/CampusConnect logo.png';
import profileImg from '../../../assets/profileImage.png';

const RoomNavbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUpdateDetails = () => {
    navigate('/room-profilepage/update-details');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Campus Connect" className="navbar-logo" />
      </div>
      <div className="navbar-right" ref={dropdownRef}>
        <span className="welcome-text">
          &larr; Welcome <span className="highlight-role">Room Provider</span>
        </span>
        <img
          src={profileImg}
          alt="Profile"
          className="navbar-profile"
          onClick={handleToggleDropdown}
        />
        {dropdownVisible && (
          <div className="profile-dropdown">
            <button onClick={handleUpdateDetails}>Update Details</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default RoomNavbar;
