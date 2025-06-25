import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MessNavbar from './MessNavbar';
import MessSidebar from './messSidebar';
import MessDashboard from './MessDashboard';
// import Updates from './Updates';
// import ConnectedPeople from './ConnectedPeople';
// import Requests from './Requests';
// import ContactUs from './ContactUs';
import './MessProfilePage.css';

const MessProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="mess-profile-container">
      <MessNavbar hideWelcomeText />
      
      {/* Hamburger toggle only visible on mobile */}
      <div className="mobile-hamburger" onClick={toggleSidebar}>
        &#9776;
      </div>

      <div className="profile-body">
        <MessSidebar isOpen={isSidebarOpen} />
        <div className="mess-content-area">
          <Routes>
            <Route path="dashboard" element={<MessDashboard />} />
            {/* <Route path="updates" element={<Updates />} />
            <Route path="connected" element={<ConnectedPeople />} />
            <Route path="requests" element={<Requests />} />
            <Route path="contact" element={<ContactUs />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MessProfilePage;
