import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgotPassword.css';
import Navbar from '../signup page/Navbarsignup';
import Footer from '../landing page/footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RoomForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false); // ✅ New state

  const passwordValidations = {
    lowercase: /[a-z]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    number: /\d/.test(newPassword),
    specialChar: /[\W_]/.test(newPassword),
    minLength: newPassword.length >= 8
  };

  const handleSendOTP = async () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    setSendingOtp(true); // ✅ Disable button & show loading
    try {
      const response = await fetch('http://localhost:5000/api/room/forgot-password/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        alert('OTP sent to your email');
        setOtpSent(true);
      } else {
        alert(data.message || 'Failed to send OTP');
        setSendingOtp(false); // ✅ Re-enable on failure
      }
    } catch (error) {
      alert('Error sending OTP. Please try again later.');
      console.error(error);
      setSendingOtp(false); // ✅ Re-enable on error
    }
  };

  const handleOtpInput = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.querySelector(`#otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    if (!value && index > 0 && e.nativeEvent.inputType === 'deleteContentBackward') {
      const prevInput = document.querySelector(`#otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (otpValue.length !== 4 || !newPassword || !confirmPassword) {
      alert('Please fill all fields correctly');
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      alert(
        'Password must be at least 8 characters long and include:\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/room/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password successfully updated');
        setEmail('');
        setOtp(['', '', '', '']);
        setNewPassword('');
        setConfirmPassword('');
        setOtpSent(false);
        setSendingOtp(false);
        setTimeout(() => navigate('/login'), 500);
      } else {
        alert(data.message || 'Failed to reset password');
      }
    } catch (err) {
      alert('Server error. Please try again later.');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <h2 className="forgot-title">Forgot Password</h2>
          <form className="forgot-form" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => !otpSent && setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={otpSent}
            />
            {!otpSent && (
              <button
                type="button"
                className="otp-button"
                onClick={handleSendOTP}
                disabled={sendingOtp} // ✅ prevent multiple clicks
              >
                {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
              </button>
            )}

            {otpSent && (
              <>
                <label>Enter OTP:</label>
                <div className="otp-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="otp-box"
                      value={digit}
                      onChange={(e) => handleOtpInput(e, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>

                <label>New Password:</label>
                <div className="password-input-wrapper">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <ul className="password-validation-list">
                  <li className={passwordValidations.lowercase ? 'valid' : 'invalid'}>
                    {passwordValidations.lowercase ? '✓' : '✗'} At least one lowercase letter
                  </li>
                  <li className={passwordValidations.uppercase ? 'valid' : 'invalid'}>
                    {passwordValidations.uppercase ? '✓' : '✗'} At least one uppercase letter
                  </li>
                  <li className={passwordValidations.number ? 'valid' : 'invalid'}>
                    {passwordValidations.number ? '✓' : '✗'} At least one number
                  </li>
                  <li className={passwordValidations.specialChar ? 'valid' : 'invalid'}>
                    {passwordValidations.specialChar ? '✓' : '✗'} At least one special character
                  </li>
                  <li className={passwordValidations.minLength ? 'valid' : 'invalid'}>
                    {passwordValidations.minLength ? '✓' : '✗'} Minimum 8 characters
                  </li>
                </ul>

                <label>Confirm Password:</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button type="submit">Submit</button>
              </>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomForgotPassword;
