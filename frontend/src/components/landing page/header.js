// File: App.js (React Frontend)
import React from 'react';
import './header.css';

function header(){
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">Campus</span>
          <span className="logo-subtext">connect</span>
        </div>
        <div className="auth-buttons">
          <button className="signup">SignUP</button>
          <button className="signin">SignIN</button>
        </div>
      </header>

      <main className="main-content">
        <div className="text-content">
          <h1>
            <span role="img" aria-label="house">🏠</span> Welcome to <span className="highlight">CampusConnect!</span>
          </h1>
          <h2>Your One-Stop Solution for Students, Mess Providers & Rental Services</h2>
          <p>
            CampusConnect is your ultimate digital hub built exclusively for students and service
            providers. Whether you're a student new to town, a mess provider looking to grow, or a room
            rental owner wanting to fill up vacant spaces—CampusConnect brings you all together in one smart,
            real-time platform.
          </p>
        </div>
        <div className="illustration">
          <img src="/student-laptop.png" alt="Student with laptop" />
        </div>
      </main>
    </div>
  );
}

export default header;
