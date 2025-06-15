import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbarsignup';
import StudentSignup from './StudentSignup';
import MessSignup from './MessSignup';
import RoomSignup from './RoomSignup';
import Footer from '../landing page/footer';
import './signup.css';

const Signup = () => {
  const [signupType, setSignupType] = useState('student');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const location = useLocation();

  // ✅ Read ?role=... from URL and update form
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get('role');

    if (role === 'student' || role === 'mess' || role === 'room') {
      setSignupType(role);
    }
  }, [location.search]);

  const renderForm = () => {
    switch (signupType) {
      case 'mess':
        return <MessSignup />;
      case 'room':
        return <RoomSignup />;
      case 'student':
      default:
        return <StudentSignup />;
    }
  };

  const getSignupTitle = () => {
    switch (signupType) {
      case 'mess':
        return 'Mess Provider';
      case 'room':
        return 'Room Provider';
      case 'student':
      default:
        return 'Student';
    }
  };

  return (
    <div className="signup-page">
      <Navbar />

      <div className="signup-container">
        <div className="signup-form-box highlighted-box shadowed-box">
          <h2 className="signup-title">SIGN UP</h2>

          <div
            className="dropdown-button center-dropdown"
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <button className="select-signup-button">
              {getSignupTitle()}
            </button>

            {dropdownVisible && (
              <div className="dropdown-options">
                <div onClick={() => setSignupType('student')}>Student</div>
                <div onClick={() => setSignupType('mess')}>Mess Provider</div>
                <div onClick={() => setSignupType('room')}>Room Provider</div>
              </div>
            )}
          </div>

          {renderForm()}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
