import React, { useState } from "react";
import './UpdateDetails.css';
import { FaEdit } from 'react-icons/fa';

const StdUpdateDetails = () => {
  const [formData, setFormData] = useState({
    phone: '',
    plotNumber: '',
    street: '',
    landmark: '',
    city: '',
    pincode: ''
  });

  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [phoneMessage, setPhoneMessage] = useState('');
  const [addressMessage, setAddressMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePhone = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      return "Enter valid 10-digit number starting with 6-9.";
    }
    return null;
  };

  const validateAddress = () => {
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      return "Enter valid 6-digit pincode.";
    }
    return null;
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const error = validatePhone();
    if (error) {
      setPhoneMessage(error);
      return;
    }
    setTimeout(() => {
      setPhoneMessage("Phone number updated successfully!");
    }, 500);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const error = validateAddress();
    if (error) {
      setAddressMessage(error);
      return;
    }
    setTimeout(() => {
      setAddressMessage("Address updated successfully!");
    }, 500);
  };

  return (
    <div className="update-details-container">
      <div className="update-card">
        <h2><FaEdit className="icon" /> Update Phone Number</h2>
        {phoneMessage && <p className="feedback">{phoneMessage}</p>}
        <form onSubmit={handlePhoneSubmit}>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10"
              required
            />
          </div>
          <button type="submit" className="update-btn">Update Phone</button>
        </form>
      </div>

      <div className="update-card">
        <h2><FaEdit className="icon" /> Update Address</h2>
        {addressMessage && <p className="feedback">{addressMessage}</p>}
        <form onSubmit={handleAddressSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="plotNumber"
              placeholder="Plot Number"
              value={formData.plotNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={formData.landmark}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pin Code"
              value={formData.pincode}
              onChange={handleChange}
              maxLength="6"
              required
            />
          </div>
          <button type="submit" className="update-btn">Update Address</button>
        </form>
      </div>
    </div>
  );
};

export default StdUpdateDetails;
