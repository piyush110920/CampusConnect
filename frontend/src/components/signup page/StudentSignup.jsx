import React, { useState } from 'react';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    college: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.college ||
      !formData.location
    ) {
      alert('All fields are required!');
      return;
    }

    // You can replace this with API call
    console.log('Student Signup Data:', formData);
    alert('✅ Signup Successful!');

    // Clear all fields after success
    setFormData({
      fullName: '',
      email: '',
      password: '',
      college: '',
      location: ''
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Full Name:</label>
      <input
        type="text"
        name="fullName"
        placeholder="Enter your name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <label>Email Address:</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <label>College Name:</label>
      <input
        type="text"
        name="college"
        placeholder="Enter your college name"
        value={formData.college}
        onChange={handleChange}
      />

      <label>Location:</label>
      <input
        type="text"
        name="location"
        placeholder="Enter your location"
        value={formData.location}
        onChange={handleChange}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default StudentSignup;
