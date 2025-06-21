import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="section admin">
        <h4>Admin Surname</h4>
        <p>Plot Number: xxxx</p>
        <p>Landmark: xxxxxxx</p>
        <p>Street: xxxxxxxxx</p>
        <p>City: xxxx</p>
        <p>State: xxxx</p>
      </div>

      <div className="section mess">
        <h4>MESS SERVICE</h4>
        <p>Service provider name:</p>
        <p>Mess name:</p>
        <p>Contact:</p>
        <p>Current Rating:</p>
        <p>Date of joining:</p>
        <p>Due On:</p>
      </div>

      <div className="section room">
        <h4>ROOM SERVICE</h4>
        <p>Service provider name:</p>
        <p>Room name:</p>
        <p>Contact:</p>
        <p>Current Rating:</p>
        <p>Date of joining:</p>
        <p>Due On:</p>
      </div>
    </div>
  );
};

export default Dashboard;
