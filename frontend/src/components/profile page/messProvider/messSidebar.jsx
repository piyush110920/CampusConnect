import React from 'react';
import { Link } from 'react-router-dom';
import './MessProfilePage.css';

const MessSidebar = ({ isOpen }) => {
  return (
    <aside className={`mess-sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><Link to="dashboard">Dashboard</Link></li>
        <li><Link to="updates">Updates</Link></li>
        <li><Link to="connected">Connected People</Link></li>
        <li><Link to="requests">Requests</Link></li>
        <li><Link to="contact">Contact Us</Link></li>
      </ul>
    </aside>
  );
};

export default MessSidebar;
