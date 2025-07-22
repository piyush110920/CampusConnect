import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MessNavbar from './MessNavbar';
import MessSidebar from './MessSidebar';
import MessDashboard from './MessDashboard';
import Messcontactus from './Messcontactus';
import MessUpdates from './MessUpdates';
import MessRequest from './MessRequest';
import ConnectedPeople from './ConnectedPeople';
import MessUpdateDetails from './MessUpdateDetails';

import './MessProfilePage.css'

const MessProfilePage = () => {
  return (
    <div className='profile-container'>
      <MessNavbar />
      <div className="profile-body">
        <MessSidebar />
        {/* Right-side content comes here */}
        <div className="content-section">
          <Routes>
            <Route path="/mess-dashboard" element={<MessDashboard />} />
            <Route path="/mess-updates" element={<MessUpdates />} />
            <Route path="/mess-connected-people" element={<ConnectedPeople/>} />
            <Route path="/mess-requests" element={<MessRequest/>} /> 
            <Route path="/messcontactus" element={<Messcontactus/>} /> 
            <Route path="/update-details" element={<MessUpdateDetails/>} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MessProfilePage;

