import React, { useState } from "react";
import './UpdateDetails.css';
import { FaEdit } from 'react-icons/fa';

const MessUpdateDetails = () => {
  const [formData, setFormData] = useState({
    phone: '',
    monthlyPrice: '',
    plotNumber: '',
    street: '',
    landmark: '',
    city: '',
    pincode: ''
  });

  const [phoneMessage, setPhoneMessage] = useState('');
  const [priceMessage, setPriceMessage] = useState('');
  const [addressMessage, setAddressMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhone = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(formData.phone) ? null : "Enter valid 10-digit number starting with 6-9.";
  };

  const validatePrice = () => {
    return formData.monthlyPrice > 0 ? null : "Enter a valid monthly price.";
  };

  const validatePincode = () => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(formData.pincode) ? null : "Enter valid 6-digit pincode.";
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const phoneErr = validatePhone();
    if (phoneErr) {
      setPhoneMessage(phoneErr);
      return;
    }

    setTimeout(() => {
      setPhoneMessage("Phone number updated successfully!");
    }, 500);
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    const priceErr = validatePrice();
    if (priceErr) {
      setPriceMessage(priceErr);
      return;
    }

    setTimeout(() => {
      setPriceMessage("Monthly price updated successfully!");
    }, 500);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const pinErr = validatePincode();
    if (pinErr) {
      setAddressMessage(pinErr);
      return;
    }

    setTimeout(() => {
      setAddressMessage("Address updated successfully!");
    }, 500);
  };

  return (
    <div className="update-details-container">
      {/* Phone Card */}
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

      {/* Monthly Price Card */}
      <div className="update-card">
        <h2><FaEdit className="icon" /> Update Monthly Price</h2>
        {priceMessage && <p className="feedback">{priceMessage}</p>}
        <form onSubmit={handlePriceSubmit}>
          <div className="form-group">
            <input
              type="number"
              name="monthlyPrice"
              placeholder="Enter monthly price"
              value={formData.monthlyPrice}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="update-btn">Update Price</button>
        </form>
      </div>

      {/* Address Card */}
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

export default MessUpdateDetails;
