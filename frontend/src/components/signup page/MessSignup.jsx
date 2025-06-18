import React, { useState, useRef } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef([]);

  const handleOtpChange = (e, index) => {
  const value = e.target.value;
  if (!/^\d?$/.test(value)) return; // Allow only one digit
  const updatedOtp = [...otp];
  updatedOtp[index] = value;
  setOtp(updatedOtp);

  // Move to next box if input is filled
  if (value && index < otp.length - 1) {
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (nextInput) nextInput.focus();
  }
};


  const validatePassword = (password) => ({
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  });

  const passwordChecks = validatePassword(formData.password);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateOtp = (e) => {
    e.preventDefault();
    const requiredFields = Object.keys(formData);
    for (let key of requiredFields) {
      if (!formData[key]) {
        alert('All fields are required!');
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const allValid = Object.values(passwordChecks).every(Boolean);
    if (!allValid) {
      alert('Password does not meet criteria.');
      return;
    }

    setOtpSent(true);
    alert('✅ OTP Sent Successfully!');
  };


   const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join('').length !== 4) {
      alert('Please enter the 4-digit OTP');
      return;
    }

    console.log('Mess Provider Signup Data:', formData);
    alert('✅ Mess Provider Signed Up Successfully!');
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
    setOtp(['', '', '', '']);
    setOtpSent(false);
  };

  return (
    <form className="signup-form" onSubmit={otpSent ? handleSubmit : generateOtp}>
      <label>Full Name:</label>
      <input disabled={otpSent}  placeholder="Enter your full name  "  type="text" name="fullName" value={formData.fullName} onChange={handleChange} />

      <label>Company/Service Name:</label>
      <input disabled={otpSent}  placeholder="Enter your service name  " type="text" name="companyName" value={formData.companyName} onChange={handleChange} />

      <label>Email:</label>
      <input disabled={otpSent}  placeholder="Enter your email address  " type="email" name="email" value={formData.email} onChange={handleChange} />

      <label>Phone Number:</label>
      <input disabled={otpSent}  placeholder="Enter your phone number " type="text" name="phone" value={formData.phone} onChange={handleChange} />

      <label>Plot Number:</label>
      <input disabled={otpSent}  placeholder="Enter your plot number  " type="text" name="plotNumber" value={formData.plotNumber} onChange={handleChange} />

      <label>Landmark:</label>
      <input disabled={otpSent} placeholder="Enter your landmark name "  type="text" name="landmark" value={formData.landmark} onChange={handleChange} />

      <label>Area:</label>
      <input disabled={otpSent}  placeholder="Enter your area name " type="text" name="area" value={formData.area} onChange={handleChange} />

      <label>City:</label>
      <input disabled={otpSent} placeholder="Enter your city " type="text" name="city" value={formData.city} onChange={handleChange} />

      <label>State:</label>
      <input disabled={otpSent}  placeholder="Enter your state  " type="text" name="state" value={formData.state} onChange={handleChange} />

      <label>Country:</label>
      <input disabled={otpSent}  placeholder="Enter your country name  " type="text" name="country" value={formData.country} onChange={handleChange} />

      <label>Pincode:</label>
      <input disabled={otpSent}  placeholder="Enter your pincode number  " type="text" name="pincode" value={formData.pincode} onChange={handleChange} />

      <label>Password:</label>
      <div className="password-field">
        <input
          disabled={otpSent}
           placeholder="Enter your password  " 
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <ul className="password-checklist">
        <li className={passwordChecks.lowercase ? 'valid' : ''}>✔ Lowercase letter</li>
        <li className={passwordChecks.uppercase ? 'valid' : ''}>✔ Uppercase letter</li>
        <li className={passwordChecks.number ? 'valid' : ''}>✔ Number</li>
        <li className={passwordChecks.specialChar ? 'valid' : ''}>✔ Special character</li>
        <li className={passwordChecks.length ? 'valid' : ''}>✔ At least 8 characters</li>
      </ul>

      <label>Confirm Password:</label>
      <div className="password-field">
        <input
          disabled={otpSent}
           placeholder="Re-enter your password " 
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

     {otpSent ? (
        <>
          <label>Enter OTP:</label>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '10px 0' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e, idx)}
                onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                className="otp-box"
                ref={otpRefs[idx]}
              />
            ))}
          </div>

          <button type="submit">Sign Up</button>
        </>
      ) : (
        <button type="button" onClick={generateOtp}>Generate OTP</button>
      )}
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
