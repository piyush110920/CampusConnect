import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOTP = () => {
    if (!mobile) {
      alert('Please enter your phone number');
      return;
    }
    alert('OTP sent to your mobile number');
    setOtpSent(true);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Simulate password reset
    console.log('Password reset for:', mobile);
    alert('Password successfully updated');

    // Clear form
    setMobile('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setOtpSent(false);

    // Navigate to login after delay
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-title">Forgot Password</h2>
        <form className="forgot-form" onSubmit={handleSubmit}>
          <label>Phone Number:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,10}$/.test(val)) {
                setMobile(val);
              }
            }}
            placeholder="Enter your phone number"
            maxLength={10}
          />
          {!otpSent && (
            <button type="button" className="otp-button" onClick={handleSendOTP}>
              Send OTP
            </button>
          )}
          {otpSent && (
            <>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter the 6-digit OTP"
                maxLength="6"
              />

              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />

              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />

              <button type="submit">Submit</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
