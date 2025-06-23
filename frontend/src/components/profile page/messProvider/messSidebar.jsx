import React from 'react';
import './MessProfilePage.css';

const MessSidebar = ({ isOpen }) => {
  return (
    <aside className={`mess-sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>Dashboard</li>
        <li>Updates</li>
        <li>Connected People</li>
        <li>Requests</li>
        <li>Contact Us</li>
      </ul>
    </aside>
  );
};

export default MessSidebar;
