import React, { useState } from 'react';

const MessSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    messName: '',
    plotNumber: '',
    street: '',
    landmark: '',
    city: '',
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
      phone,
      messName,
      plotNumber,
      street,
      landmark,
      city,
      pincode,
      password,
      confirmPassword
    } = formData;

    // Validation
    if (
      !fullName ||
      !phone ||
      !messName ||
      !plotNumber ||
      !street ||
      !landmark ||
      !city ||
      !pincode ||
      !password ||
      !confirmPassword
    ) {
      alert('All fields are required!');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      alert('Pincode must be 6 digits.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const address = `${plotNumber}, ${street}, ${landmark}, ${city} - ${pincode}`;

    console.log('🍱 Mess Provider Signup Data:', {
      fullName,
      phone,
      messName,
      address,
      password
    });

    alert('✅ Mess Provider Signed Up Successfully!');

    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      messName: '',
      plotNumber: '',
      street: '',
      landmark: '',
      city: '',
      pincode: '',
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

      <label>Appartment Name:</label>
      <input
        type="text"
        name="messName"
        placeholder="Enter your mess name"
        value={formData.messName}
        onChange={handleChange}
      />

      <label>Plot Number:</label>
      <input
        type="text"
        name="plotNumber"
        placeholder="Enter plot number"
        value={formData.plotNumber}
        onChange={handleChange}
      />

      <label>Street Name:</label>
      <input
        type="text"
        name="street"
        placeholder="Enter street name"
        value={formData.street}
        onChange={handleChange}
      />

      <label>Landmark:</label>
      <input
        type="text"
        name="landmark"
        placeholder="Enter landmark"
        value={formData.landmark}
        onChange={handleChange}
      />

      <label>City:</label>
      <input
        type="text"
        name="city"
        placeholder="Enter city"
        value={formData.city}
        onChange={handleChange}
      />

      <label>Pincode:</label>
      <input
        type="text"
        name="pincode"
        placeholder="Enter 6-digit pincode"
        value={formData.pincode}
        onChange={handleChange}
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
      />

      <label>Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Re-enter password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

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
