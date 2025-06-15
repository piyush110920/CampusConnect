import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginform.css';

const LoginForm = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobile || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Mobile number must be exactly 10 digits and contain only numbers.");
      return;
    }

    console.log("Logging in with:", mobile, password);
    setMobile('');
    setPassword('');
  };

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setMobile(value);
  };

  return (
    <div className="login-form-box">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Mobile Number:</label>
        <input
          type="text"
          value={mobile}
          onChange={handleMobileInput}
          maxLength="10"
          placeholder="Enter your mobile number"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <div className="login-actions">
          <p onClick={() => navigate('/forgot-password')} className="link-like">Forgot Password?</p>
        </div>

        <button type="submit">Login</button>

        <div className="login-links">
          <p>
            Don't have an account?{' '}
            <span className="link-like" onClick={() => navigate('/signup')}>Register here</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
