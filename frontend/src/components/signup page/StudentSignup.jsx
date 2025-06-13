import React, { useState } from 'react';
import './StudentSignup.css';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    alert("Signup successful!");
    setFormData({
      name: '',
      email: '',
      password: '',
      college: '',
      location: ''
    });
  };

  return (
    <div className="signup-container">
      
      {/* Title */}
      <h2 className="signup-title">Your SignUP</h2>
      <div className="account-type">Student Account</div>

      {/* Signup Form */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>E-mail:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>College:</label>
        <input type="text" name="college" value={formData.college} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default StudentSignup;
