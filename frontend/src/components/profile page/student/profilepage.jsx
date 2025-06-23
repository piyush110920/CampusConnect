import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import RoomServices from './roomServices';
import MessServices from './messServices';
import Suggestions from './suggestions';
import StdContactus from './Stdcontactus';

import chatbotIcon from '../../../assets/chat.png'
import './profilepage.css'

const ProfilePage = () => {
  return (
    <div className='profile-container'>
      <Navbar />
      <div className="profile-body">
        <Sidebar />
        {/* Right-side content comes here */}
        <div className="content-section">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/room-services" element={<RoomServices />} />
            <Route path="/mess-services" element={<MessServices />} />
            <Route path="/suggestions" element={<Suggestions/>} />
            <Route path="/studentcontactus" element={<StdContactus/>} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
      {/* Chatbot Icon */}
      
      <img src={chatbotIcon} alt="chatbot" className="chatbot-icon" />
    </div>
  );
};

export default ProfilePage;

