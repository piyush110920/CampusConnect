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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    // Here you'd normally send the data to backend
  };

  return (
    <div className="mess-update-container">
      <div className="update-section">
        <h2><FaEdit className="icon" /> Update Your Details</h2>
        <p className="sub-heading">You can update your contact info, pricing, and address below.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Monthly Price (in ₹)</label>
            <input
              type="number"
              name="monthlyPrice"
              placeholder="Enter monthly price"
              value={formData.monthlyPrice}
              onChange={handleChange}
            />
          </div>

          <hr className="divider" />

          <h3 className="address-heading">Update Address</h3>

          <div className="form-group">
            <label>Plot Number</label>
            <input
              type="text"
              name="plotNumber"
              placeholder="Enter plot number"
              value={formData.plotNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              name="street"
              placeholder="Enter street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Landmark</label>
            <input
              type="text"
              name="landmark"
              placeholder="Enter landmark"
              value={formData.landmark}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Pin Code</label>
            <input
              type="text"
              name="pincode"
              placeholder="Enter pin code"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="update-btn">Update Details</button>
        </form>
      </div>
    </div>
  );
};

export default MessUpdateDetails;
