import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './RoomSidebar.css';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaComments,
  FaInfoCircle,
  FaEnvelope,
} from 'react-icons/fa';

const RoomSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const navItems = [
    { icon: <FaHome />, label: 'Dashboard', path: '/room-profilepage/room-dashboard' },
    { icon: <FaComments />, label: 'Updates', path: '/room-profilepage/room-updates' },
    { icon: <FaUsers />, label: 'Connected People', path: '/room-profilepage/room-connected-people' },
    { icon: <FaInfoCircle />, label: 'Requests', path: '/room-profilepage/room-requests' },
    { icon: <FaEnvelope />, label: 'Contact Us', path: '/room-profilepage/roomcontactus' },
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
        {isExpanded && <h2 className="sidebar-title">Room Profile</h2>}
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

export default RoomSidebar;
