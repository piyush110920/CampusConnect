import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
        <li onClick={() => navigate('/room-services')}>Room Services</li>
        <li onClick={() => navigate('/mess-services')}>Mess Service</li>
        <li onClick={() => navigate('/feedbacks')}>campusINTELLIGENCE</li>
        <li onClick={() => navigate('/feedbacks')}>Feedbacks & Ratings</li>
        <li onClick={() => navigate('/contact')}>Contact Us</li>
      </ul>
    </div>
  );
};

export default Sidebar;
