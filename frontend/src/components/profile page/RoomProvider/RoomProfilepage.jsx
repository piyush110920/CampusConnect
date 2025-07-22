import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoomNavbar from './RoomNavbar';
import RoomSidebar from './RoomSidebar';
import RoomDashboard from './RoomDashboard';
import Roomcontactus from './Roomcontactus';
import RoomUpdates from './RoomUpdates';
import RoomRequest from './RoomRequest';
import RoomConnectedPeople from './ConnectedRoomPeople';
import RoomUpdateDetails from './RoomUpdateDetails';

import './RoomProfilePage.css'

const RoomProfilePage = () => {
  return (
    <div className='profile-container'>
      <RoomNavbar />
      <div className="profile-body">
        <RoomSidebar />
        {/* Right-side content comes here */}
        <div className="content-section">
          <Routes>
            <Route path="/room-dashboard" element={<RoomDashboard />} />
            <Route path="/room-updates" element={<RoomUpdates />} />
            <Route path="/room-connected-people" element={<RoomConnectedPeople/>} />
            <Route path="/room-requests" element={<RoomRequest/>} /> 
            <Route path="/roomcontactus" element={<Roomcontactus/>} /> 
            <Route path="/update-details" element={<RoomUpdateDetails/>} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RoomProfilePage;

