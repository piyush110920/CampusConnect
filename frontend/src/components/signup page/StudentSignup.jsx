import React, { useState } from 'react';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    plotNumber: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    country: '',
    pinCode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      fullName,
      email,
      password,
      confirmPassword,
      college,
      plotNumber,
      landmark,
      area,
      city,
      state,
      country,
      pinCode
    } = formData;

    // Basic field validation
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !college ||
      !plotNumber ||
      !landmark ||
      !area ||
      !city ||
      !state ||
      !country ||
      !pinCode
    ) {
      alert('All fields are required!');
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Password format validation
    if (!validatePassword(password)) {
      alert(
        'Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
      );
      return;
    }

    console.log('Student Signup Data:', formData);
    alert('✅ Signup Successful!');

    // Clear form after success
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      college: '',
      plotNumber: '',
      landmark: '',
      area: '',
      city: '',
      state: '',
      country: '',
      pinCode: ''
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

      <label>Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData.confirmPassword}
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

      <label>Plot Number:</label>
      <input
        type="text"
        name="plotNumber"
        placeholder="Plot No."
        value={formData.plotNumber}
        onChange={handleChange}
      />

      <label>Landmark:</label>
      <input
        type="text"
        name="landmark"
        placeholder="Landmark"
        value={formData.landmark}
        onChange={handleChange}
      />

      <label>Area:</label>
      <input
        type="text"
        name="area"
        placeholder="Area"
        value={formData.area}
        onChange={handleChange}
      />

      <label>City:</label>
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <label>State:</label>
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />

      <label>Country:</label>
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />

      <label>Pin Code:</label>
      <input
        type="text"
        name="pinCode"
        placeholder="Pin Code"
        value={formData.pinCode}
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

export default StudentSignup;
