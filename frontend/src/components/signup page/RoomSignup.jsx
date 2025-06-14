import React, { useState } from 'react';

const RoomSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
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

    const { fullName, phone, address, password, confirmPassword } = formData;

    // Validation
    if (!fullName || !phone || !address || !password || !confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Success - can be sent to backend here
    console.log('Room Provider Signup Data:', formData);
    alert('✅ Room Provider Signed Up Successfully!');

    // Clear form
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: ''
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

      <label>Phone Number:</label>
      <input
        type="text"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
      />

      <label>Address:</label>
      <input
        type="text"
        name="address"
        placeholder="Enter your address"
        value={formData.address}
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

      <label>Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RoomSignup;
