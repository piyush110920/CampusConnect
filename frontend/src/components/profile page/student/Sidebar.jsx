import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBed,
  FaUtensils,
  FaBrain,
  FaLightbulb,
  FaEnvelope,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaBed />, label: 'Room Services', path: '/room-services' },
    { icon: <FaUtensils />, label: 'Mess Services', path: '/mess-services' },
    { icon: <FaBrain />, label: 'campusINTELLIGENCE', path: '/feedbacks' },
    { icon: <FaLightbulb />, label: 'Suggestions', path: '/suggestions' },
    { icon: <FaEnvelope />, label: 'Contact Us', path: '/studentcontactus' },
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
        {isExpanded && <h2 className="sidebar-title">Student Profile</h2>}
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

export default Sidebar;
