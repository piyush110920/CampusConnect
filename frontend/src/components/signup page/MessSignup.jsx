import React, { useState } from 'react';
import './MessSignup.css';

const MessSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    plotNumber: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      fullName,
      companyName,
      email,
      phone,
      plotNumber,
      landmark,
      area,
      city,
      state,
      country,
      pincode,
      password,
      confirmPassword
    } = formData;

    // Check for empty fields
    for (let key in formData) {
      if (!formData[key]) {
        alert('All fields are required!');
        return;
      }
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Enter a valid email address.');
      return;
    }

    // Validate phone number
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      alert('Enter a valid 10-digit phone number.');
      return;
    }

    // Validate pincode
    const pinPattern = /^[0-9]{6}$/;
    if (!pinPattern.test(pincode)) {
      alert('Enter a valid 6-digit pincode.');
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Combine address
    const fullAddress = `${plotNumber}, ${landmark}, ${area}, ${city}, ${state}, ${country} - ${pincode}`;

    const submissionData = {
      fullName,
      companyName,
      email,
      phone,
      address: fullAddress,
      password
    };

    console.log('Mess Provider Signup Data:', submissionData);
    alert('✅ Mess Provider Signed Up Successfully!');

    // Reset form
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      plotNumber: '',
      landmark: '',
      area: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>Full Name:</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your name" />

      <label>Company/Service Name:</label>
      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Mess or Service name" />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />

      <label>Phone Number:</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10-digit phone number" />

      <label>Plot Number:</label>
      <input type="text" name="plotNumber" value={formData.plotNumber} onChange={handleChange} placeholder="e.g., 268/A" />

      <label>Landmark:</label>
      <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Near park, school, etc." />

      <label>Area:</label>
      <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Area name" />

      <label>City:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />

      <label>State:</label>
      <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />

      <label>Country:</label>
      <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />

      <label>Pincode:</label>
      <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="6-digit pincode" />

      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />

      <label>Confirm Password:</label>
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />

      <button type="submit">Sign Up</button>
       <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
          Login
        </a>
      </p>
    </form>
  );
};

export default MessSignup;
