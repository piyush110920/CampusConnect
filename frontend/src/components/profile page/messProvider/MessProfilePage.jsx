import React, { useState } from 'react';
import Navbar from '../student/Navbar';
import MessSidebar from './messSidebar';
import './MessProfilePage.css';

const MessProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="mess-profile-container">
      <Navbar />
      <div className="mobile-hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>
      <div className="profile-body">
        <MessSidebar isOpen={isSidebarOpen} />
        <div className="mess-content-area">
          {/* Add your content here */}
          <h2>Welcome, Mess Admin</h2>
        </div>
      </div>
    </div>
  );
};

export default MessProfilePage;
