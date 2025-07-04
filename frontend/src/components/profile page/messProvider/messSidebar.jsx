import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MessSidebar.css';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaComments,
  FaInfoCircle,
  FaLightbulb,
  FaEnvelope,
} from 'react-icons/fa';

const MessSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/mess-profilepage/mess-dashboard' },
    { icon: <FaComments />, label: 'Updates', path: '/mess-profilepage/mess-updates' },
    { icon: <FaUsers />, label: 'Connected People', path: '/mess-profilepage/mess-connected-people' },
    { icon: <FaInfoCircle />, label: 'Requests', path: '/mess-profilepage/mess-requests' },
    { icon: <FaEnvelope />, label: 'Contact Us', path: '/mess-profilepage/messcontactus' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isExpanded ? <FaTimes /> : <FaBars />}
        </button>
        {isExpanded && <h2 className="sidebar-title">Mess Profile</h2>}
      </div>
      <ul className="sidebar-menu">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={index}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <span className="icon">{item.icon}</span>
              {isExpanded && <span className="label">{item.label}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessSidebar;
