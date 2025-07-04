import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './RoomSignup.css';

const RoomSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    messName: '',
    plotNumber: '',
    street: '',
    landmark: '',
    city: '',
    pincode: '',
    price: '', // ✅ added price
    password: '',
    confirmPassword: ''
  });

  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
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

  const validatePassword = (password) => ({
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  });

  const passwordChecks = validatePassword(formData.password);

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const generateOtp = async () => {
    const {
      fullName, email, phone, messName, plotNumber, street,
      landmark, city, pincode, price, password, confirmPassword
    } = formData;

    if (!fullName || !email || !phone || !messName || !plotNumber || !street ||
        !landmark || !city || !pincode || !price || !password || !confirmPassword) {
      alert('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      alert('Password does not meet all criteria!');
      return;
    }

    try {
      setLoadingOtp(true);
      const res = await fetch('http://localhost:5000/api/room/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
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
      console.error('OTP generation error:', err);
      alert('Error generating OTP. Try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullOtp = otp.join('');
    if (!otpSent) return alert('Please generate the OTP first!');
    if (otp.some(val => val === '')) return alert('Please enter the complete 4-digit OTP');

    try {
      const res = await fetch('http://localhost:5000/api/room/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, email: formData.email.trim(), otp: fullOtp })
      });

      const data = await res.json();
      if (res.ok) {
        alert('🎉 Room Provider Signed Up Successfully!');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          messName: '',
          plotNumber: '',
          street: '',
          landmark: '',
          city: '',
          pincode: '',
          price: '', // ✅ clear price field
          password: '',
          confirmPassword: ''
        });
        setOtp(['', '', '', '']);
        setOtpSent(false);
        setOtpVerified(false);
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed. Please check your OTP.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Error during signup. Try again.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {[
        ['Full Name', 'fullName'], ['Email Address', 'email'], ['Phone Number', 'phone'],
        ['Apartment Name', 'messName'], ['Plot Number', 'plotNumber'], ['Street Name', 'street'],
        ['Landmark', 'landmark'], ['City', 'city'], ['Pincode', 'pincode'], ['Monthly Price (₹)', 'price'] // ✅ added
      ].map(([label, name]) => (
        <React.Fragment key={name}>
          <label>{label}:</label>
          <input
            name={name}
            type={name === 'email' ? 'email' : name === 'price' ? 'number' : 'text'}
            value={formData[name]}
            onChange={handleChange}
            placeholder={`Enter your ${label.toLowerCase()}`}
            readOnly={isFieldDisabled}
          />
        </React.Fragment>
      ))}

      <label>Password:</label>
      <div className="password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          readOnly={isFieldDisabled}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
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
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          readOnly={isFieldDisabled}
        />
        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {otpSent && !otpVerified ? (
        <>
          <label>Enter OTP:</label>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '10px 0' }}>
            {otp.map((val, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                maxLength="1"
                value={val}
                onChange={(e) => handleOtpChange(e, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
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
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default RoomSignup;
