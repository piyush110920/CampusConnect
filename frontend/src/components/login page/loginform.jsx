import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginform.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/${role}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();

      if (res.ok) {
        alert('🎉 Login Successful!');
        localStorage.setItem('token', data.token); // Save JWT
        // Redirect based on role
        if (role === 'student') navigate('/student-dashboard');
        else if (role === 'room') navigate('/room-dashboard');
        else if (role === 'mess') navigate('/mess-dashboard');
      } else {
        alert(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div className="login-form-box">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Select Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="room">Room Provider</option>
          <option value="mess">Mess Provider</option>
        </select>

        <label>Email Address:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <label>Password:</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="eye-icon"
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="login-actions">
          <p onClick={() => navigate('/forgot-password')} className="link-like">
            Forgot Password?
          </p>
        </div>

        <button type="submit">Login</button>

        <div className="login-links">
          <p>
            Don't have an account?{' '}
            <span className="link-like" onClick={() => navigate('/student-signup')}>
              Register here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
