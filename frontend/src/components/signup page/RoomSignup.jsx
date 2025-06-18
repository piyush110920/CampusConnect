import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './RoomSignup.css'

const RoomSignup = () => {
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  const isFieldDisabled = otpSent;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => ({
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  });

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const generateOtp = () => {
    const { fullName, phone, messName, plotNumber, street, landmark, city, pincode, password, confirmPassword } = formData;

    if (!fullName || !phone || !messName || !plotNumber || !street || !landmark || !city || !pincode || !password || !confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const checks = validatePassword(password);
    const allValid = Object.values(checks).every(Boolean);
    if (!allValid) {
      alert('Password does not meet criteria.');
      return;
    }

    setOtpSent(true);
    alert('✅ OTP sent successfully!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.some((val) => val === '')) {
      alert('Please enter the complete OTP!');
      return;
    }

    const fullOtp = otp.join('');
    const { fullName, phone, messName, plotNumber, street, landmark, city, pincode, password } = formData;
    const fullAddress = `${plotNumber}, ${street}, ${landmark}, ${city} - ${pincode}`;

    console.log('🎉 Mess Provider Signup Data:', {
      fullName,
      phone,
      messName,
      address: fullAddress,
      password,
      otp: fullOtp
    });

    alert('🎉 Mess Provider Signed Up Successfully!');

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
    setOtp(['', '', '', '']);
    setOtpSent(false);
  };

  const passwordChecks = validatePassword(formData.password);

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Full Name:</label>
      <input name="fullName"  placeholder="Enter your full name  " value={formData.fullName} onChange={handleChange} readOnly={isFieldDisabled} />

      <label>Phone Number:</label>
      <input name="phone"  placeholder="Enter your phone number"  value={formData.phone} onChange={handleChange} readOnly={isFieldDisabled} />

      <label>Apartment Name:</label>
      <input name="messName"  placeholder="Enter your apartment name " value={formData.messName} onChange={handleChange} readOnly={isFieldDisabled} />

      <label>Plot Number:</label>
      <input name="plotNumber"  placeholder="Enter your plot nnumber" value={formData.plotNumber} onChange={handleChange} readOnly={isFieldDisabled} />

      <label>Street Name:</label>
      <input name="street" placeholder="Enter your street name"  value={formData.street} onChange={handleChange} readOnly={isFieldDisabled} />

      <label>Landmark:</label>
      <input name="landmark"  placeholder="Enter your landmark" value={formData.landmark} onChange={handleChange} readOnly={isFieldDisabled} />

      <label>City:</label>
      <input name="city"  placeholder="Enter yor city"  value={formData.city} onChange={handleChange} readOnly={isFieldDisabled} />

      <label>Pincode:</label>
      <input name="pincode" placeholder="Enter your pincode"  value={formData.pincode} onChange={handleChange} readOnly={isFieldDisabled} />

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
        <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
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
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Re-enter your password" 
          value={formData.confirmPassword}
          onChange={handleChange}
          readOnly={isFieldDisabled}
        />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {otpSent && (
        <>
          <label>Enter OTP:</label>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {otp.map((val, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                maxLength="1"
                className="otp-box"
                value={val}
                onChange={(e) => handleOtpChange(e, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
              />
            ))}
          </div>
          <button type="submit">Sign Up</button>
        </>
      )}

      {!otpSent && (
        <button type="button" onClick={generateOtp}>Generate OTP</button>
      )}

      <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default RoomSignup;
