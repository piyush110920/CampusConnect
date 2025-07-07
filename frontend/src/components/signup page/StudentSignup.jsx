import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './studentSignup.css';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '', // ✅ added phone number
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
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loadingOtp, setLoadingOtp] = useState(false);

  const navigate = useNavigate();
  const isFieldDisabled = otpSent;

  useEffect(() => {
    setOtp(['', '', '', '']);
    setOtpSent(false);
    setOtpVerified(false);
  }, [formData.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

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

  const validatePassword = (password) => ({
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  });

  const passwordChecks = validatePassword(formData.password);

  const generateOtp = async () => {
    const {
      fullName, email, phoneNumber, password, confirmPassword, college,
      plotNumber, landmark, area, city, state, country, pinCode
    } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      alert('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    if (!fullName || !email || !phoneNumber || !password || !confirmPassword || !college ||
      !plotNumber || !landmark || !area || !city || !state || !country || !pinCode) {
      alert('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      alert('Password must meet all criteria.');
      return;
    }

    try {
      setLoadingOtp(true);
      const res = await fetch('http://localhost:5000/api/student/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await res.json();
      setLoadingOtp(false);

      if (res.ok) {
        alert('✅ OTP sent successfully to your email!');
        setOtpSent(true);
      } else {
        alert(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setLoadingOtp(false);
      console.error('Error generating OTP:', err);
      alert('Error generating OTP. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');

    if (!otpSent) {
      alert('Please generate OTP first.');
      return;
    }

    if (otp.some(val => val === '')) {
      alert('Please enter the complete 4-digit OTP!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/student/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, email: formData.email.trim(), otp: finalOtp })
      });

      const data = await res.json();

      if (res.ok) {
        alert('🎉 Signup Successful!');
        setFormData({
          fullName: '', email: '', phoneNumber: '', password: '', confirmPassword: '', college: '',
          plotNumber: '', landmark: '', area: '', city: '', state: '', country: '', pinCode: ''
        });
        setOtp(['', '', '', '']);
        setOtpSent(false);
        setOtpVerified(false);
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed. Please check your OTP and try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Error during signup. Please try again.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Full Name:</label>
      <input
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>Email Address:</label>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>Phone Number:</label>
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Enter your 10-digit phone number"
        value={formData.phoneNumber}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>College Name:</label>
      <input
        type="text"
        name="college"
        placeholder="Enter your college name"
        value={formData.college}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>Plot Number:</label>
      <input
        type="text"
        name="plotNumber"
        placeholder="Enter your plot number"
        value={formData.plotNumber}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>Landmark:</label>
      <input
        type="text"
        name="landmark"
        placeholder="Enter your landmark"
        value={formData.landmark}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>Area:</label>
      <input
        type="text"
        name="area"
        placeholder="Enter your area"
        value={formData.area}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>City:</label>
      <input
        type="text"
        name="city"
        placeholder="Enter your city"
        value={formData.city}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>State:</label>
      <input
        type="text"
        name="state"
        placeholder="Enter your state"
        value={formData.state}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>Country:</label>
      <input
        type="text"
        name="country"
        placeholder="Enter your country"
        value={formData.country}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

      <label>Pin Code:</label>
      <input
        type="text"
        name="pinCode"
        placeholder="Enter your pin code"
        value={formData.pinCode}
        onChange={handleChange}
        readOnly={isFieldDisabled}
      />

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

      {otpSent && !otpVerified && (
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
          <p style={{ textAlign: 'center', color: 'green' }}>OTP sent to {formData.email}</p>
          <button type="submit">Sign Up</button>
        </>
      )}

      {!otpSent && (
        <button type="button" onClick={generateOtp} disabled={loadingOtp}>
          {loadingOtp ? 'Sending OTP...' : 'Generate OTP'}
        </button>
      )}

      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} style={{ color: '#007bff', cursor: 'pointer' }}>
          Login
        </span>
      </p>
    </form>
  );
};

export default StudentSignup;
