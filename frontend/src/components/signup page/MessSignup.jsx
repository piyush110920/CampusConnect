import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    monthlyPrice: '', // ✅ added
    password: '',
    confirmPassword: ''
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);
    if (val && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const validatePassword = (password) => ({
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*]/.test(password)
  });

  const passwordChecks = validatePassword(formData.password);

  const generateOtp = async () => {
    const {
      fullName, email, phone, companyName, plotNumber, landmark,
      area, city, state, country, pincode, monthlyPrice, password, confirmPassword
    } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (Object.values(formData).some(val => !val)) {
      alert('All fields are required!');
      return;
    }

    if (isNaN(monthlyPrice) || Number(monthlyPrice) <= 0) {
      alert('Please enter a valid monthly price.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      alert('Password does not meet all criteria.');
      return;
    }

    try {
      setLoadingOtp(true);
      const res = await fetch('http://localhost:5000/api/mess/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setLoadingOtp(false);

      if (res.ok) {
        alert('✅ OTP sent to your email!');
        setOtpSent(true);
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setLoadingOtp(false);
      alert('Error generating OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');

    if (!otpSent) {
      alert('Please generate OTP first.');
      return;
    }

    if (otp.some(val => val === '')) {
      alert('Please enter the full 4-digit OTP!');
      return;
    }

    if (isNaN(formData.monthlyPrice) || Number(formData.monthlyPrice) <= 0) {
      alert('Invalid monthly price.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/mess/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, otp: fullOtp })
      });

      const data = await res.json();

      if (res.ok) {
        alert('🎉 Mess Provider Signed Up Successfully!');
        setFormData({
          fullName: '', companyName: '', email: '', phone: '',
          plotNumber: '', landmark: '', area: '', city: '',
          state: '', country: '', pincode: '', monthlyPrice: '',
          password: '', confirmPassword: ''
        });
        setOtp(['', '', '', '']);
        setOtpSent(false);
        setOtpVerified(false);
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed. Please check your OTP.');
      }
    } catch (err) {
      alert('Signup failed. Try again.');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {[
        ['Full Name', 'fullName'], ['Company Name', 'companyName'], ['Email', 'email'],
        ['Phone', 'phone'], ['Plot Number', 'plotNumber'], ['Landmark', 'landmark'],
        ['Area', 'area'], ['City', 'city'], ['State', 'state'],
        ['Country', 'country'], ['Pincode', 'pincode']
      ].map(([label, name]) => (
        <React.Fragment key={name}>
          <label>{label}:</label>
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            disabled={isFieldDisabled}
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        </React.Fragment>
      ))}

      {/* ✅ Monthly Price Field */}
      <label>Monthly Price (₹):</label>
      <input
        type="number"
        name="monthlyPrice"
        value={formData.monthlyPrice}
        onChange={handleChange}
        disabled={isFieldDisabled}
        placeholder="Enter monthly price"
      />

      {/* Password */}
      <label>Password:</label>
      <div className="password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isFieldDisabled}
          placeholder="Enter password"
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Password Checklist */}
      <ul className="password-checklist">
        <li className={passwordChecks.lowercase ? 'valid' : ''}>✔ Lowercase</li>
        <li className={passwordChecks.uppercase ? 'valid' : ''}>✔ Uppercase</li>
        <li className={passwordChecks.number ? 'valid' : ''}>✔ Number</li>
        <li className={passwordChecks.specialChar ? 'valid' : ''}>✔ Special Char</li>
        <li className={passwordChecks.length ? 'valid' : ''}>✔ 8+ Characters</li>
      </ul>

      {/* Confirm Password */}
      <label>Confirm Password:</label>
      <div className="password-field">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isFieldDisabled}
          placeholder="Confirm password"
        />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* OTP */}
      {otpSent ? (
        <>
          <label>Enter OTP:</label>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
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
      ) : (
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

export default MessSignup;
