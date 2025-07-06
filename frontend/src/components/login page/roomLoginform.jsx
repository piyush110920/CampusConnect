import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginFormStyle.css';

const RoomLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('⚠️ Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('❌ Invalid email format.');
      return;
    }

    if (password.length < 6) {
      alert('❌ Password must be at least 6 characters long.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/room/login', {
        email,
        password
      });

      const { token, message, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      alert(`✅ ${message}`);
      navigate('/room-profilepage/room-dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || '❌ Login failed. Please try again.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>Email Address:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />

      <label>Password:</label>
      <div className="password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="eye-icon"
        >
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>

      <div className="login-actions">
        <p onClick={() => navigate('/room-forgot-password')} className="link-like">
          Forgot Password?
        </p>
      </div>

      <button type="submit">Login</button>

      <div className="login-links">
        <p>
          Don't have an account?{' '}
          <span className="link-like" onClick={() => navigate('/signup?role=room')}>
            Register here
          </span>
        </p>
      </div>
    </form>
  );
};

export default RoomLoginForm;
