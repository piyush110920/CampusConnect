import React from 'react';
import './MessDashboard.css';

const MessDashboard = () => {
  return (
    <div className="mess-dashboard">
      <h2 className="dashboard-title">Mess Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Active Students</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Pending Requests</h3>
          <p>8</p>
        </div>

        <div className="card">
          <h3>Ratings</h3>
          <p>4.5 / 5 ⭐</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Recent Complaints</h3>
        <ul className="complaints-list">
          <li>Late breakfast delivery - John D.</li>
          <li>Cold food - Anita R.</li>
          <li>Low quantity served - Rahul M.</li>
        </ul>
      </div>
    </div>
  );
};

export default MessDashboard;
