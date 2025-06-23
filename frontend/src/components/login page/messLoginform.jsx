import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginFormStyle.css';

const MessLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert('⚠️ Please fill in all fields.');
      return;
    }

    // Email format check (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('❌ Invalid email format.');
      return;
    }

    // Password length check
    if (password.length < 6) {
      alert('❌ Password must be at least 6 characters long.');
      return;
    }

    // If all good
    alert(`✅ Successfully logged in as Student\nEmail: ${email}`);
    navigate('/dashboard'); // redirect to dashboard or preferred route
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
        <p onClick={() => navigate('/mess-forgot-password')} className="link-like">
          Forgot Password?
        </p>
      </div>

      <button type="submit">Login</button>

      <div className="login-links">
        <p>
          Don't have an account?{' '}
          <span className="link-like" onClick={() => navigate('/signup?role=student')}>
            Register here
          </span>
        </p>
      </div>
    </form>
  );
};

export default MessLoginForm;
