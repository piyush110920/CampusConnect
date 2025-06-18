import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './studentSignup.css';

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  const isFieldDisabled = otpSent;

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

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
  };

  const passwordChecks = validatePassword(formData.password);

  const generateOtp = () => {
    const {
      fullName, email, password, confirmPassword,
      college, plotNumber, landmark, area,
      city, state, country, pinCode
    } = formData;

    if (!fullName || !email || !password || !confirmPassword ||
        !college || !plotNumber || !landmark || !area ||
        !city || !state || !country || !pinCode) {
      alert('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const allValid = Object.values(passwordChecks).every(Boolean);
    if (!allValid) {
      alert('Password must meet all criteria.');
      return;
    }

    alert('✅ OTP sent successfully!');
    setOtpSent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.some(val => val === '')) {
      alert('Please enter the full OTP!');
      return;
    }

    const enteredOtp = otp.join('');
    console.log('OTP Entered:', enteredOtp);
    console.log('Student Signup Data:', formData);
    alert('🎉 Signup Successful!');

    // Reset all
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
    setOtp(['', '', '', '']);
    setOtpSent(false);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Form Fields */}
      {[
        ['Full Name', 'fullName'],
        ['Email Address', 'email'],
        ['College Name', 'college'],
        ['Plot Number', 'plotNumber'],
        ['Landmark', 'landmark'],
        ['Area', 'area'],
        ['City', 'city'],
        ['State', 'state'],
        ['Country', 'country'],
        ['Pin Code', 'pinCode']
      ].map(([label, name]) => (
        <React.Fragment key={name}>
          <label>{label}:</label>
          <input
            type="text"
            name={name}
            placeholder={`Enter your ${label.toLowerCase()}`}
            value={formData[name]}
            onChange={handleChange}
            readOnly={isFieldDisabled}
          />
        </React.Fragment>
      ))}

      {/* Password */}
      <label>Password:</label>
      <div className="password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          readOnly={isFieldDisabled}
        />
        <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <ul className="password-checklist">
        <li className={passwordChecks.lowercase ? 'valid' : ''}>✔ At least one lowercase letter</li>
        <li className={passwordChecks.uppercase ? 'valid' : ''}>✔ At least one uppercase letter</li>
        <li className={passwordChecks.number ? 'valid' : ''}>✔ At least one number</li>
        <li className={passwordChecks.specialChar ? 'valid' : ''}>✔ At least one special character</li>
        <li className={passwordChecks.length ? 'valid' : ''}>✔ Minimum 8 characters</li>
      </ul>

      {/* Confirm Password */}
      <label>Confirm Password:</label>
      <div className="password-field">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          readOnly={isFieldDisabled}
        />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* OTP Section */}
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

export default StudentSignup;
