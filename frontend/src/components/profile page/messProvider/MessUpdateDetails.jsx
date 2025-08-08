import React, { useState } from "react";
import './UpdateDetails.css';
import { FaEdit } from 'react-icons/fa';

const BASE_URL = "http://localhost:5000/api/mess"; // Adjust if needed

const MessUpdateDetails = () => {
  const [formData, setFormData] = useState({
    phone: '',
    monthlyPrice: '',
    plotNumber: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  });

  const [phoneMessage, setPhoneMessage] = useState('');
  const [priceMessage, setPriceMessage] = useState('');
  const [addressMessage, setAddressMessage] = useState('');

  const [loadingPhone, setLoadingPhone] = useState(false);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
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

  // Update phone
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const error = validatePhone();
    if (error) {
      setPhoneMessage(error);
      return;
    }

    setLoadingPhone(true);
    setPhoneMessage('');

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/update-phone`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ phone: formData.phone })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error updating phone");

      setPhoneMessage(data.message || "Phone number updated successfully!");
      setFormData({ ...formData, phone: '' });

    } catch (err) {
      setPhoneMessage(err.message);
    } finally {
      setLoadingPhone(false);
      setTimeout(() => setPhoneMessage(''), 3000);
    }
  };

  // Update monthly price
  const handlePriceSubmit = async (e) => {
    e.preventDefault();
    const error = validatePrice();
    if (error) {
      setPriceMessage(error);
      return;
    }

    setLoadingPrice(true);
    setPriceMessage('');

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/update-price`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ monthlyPrice: formData.monthlyPrice })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error updating monthly price");

      setPriceMessage(data.message || "Monthly price updated successfully!");
      setFormData({ ...formData, monthlyPrice: '' });

    } catch (err) {
      setPriceMessage(err.message);
    } finally {
      setLoadingPrice(false);
      setTimeout(() => setPriceMessage(''), 3000);
    }
  };

  // Update address
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const error = validatePincode();
    if (error) {
      setAddressMessage(error);
      return;
    }

    setLoadingAddress(true);
    setAddressMessage('');

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/update-address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          plotNumber: formData.plotNumber,
          landmark: formData.landmark,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error updating address");

      setAddressMessage(data.message || "Address updated successfully!");
      setFormData({
        ...formData,
        plotNumber: '',
        landmark: '',
        area: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
      });

    } catch (err) {
      setAddressMessage(err.message);
    } finally {
      setLoadingAddress(false);
      setTimeout(() => setAddressMessage(''), 3000);
    }
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
          <button type="submit" className="update-btn" disabled={loadingPhone}>
            {loadingPhone ? "Updating..." : "Update Phone"}
          </button>
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
          <button type="submit" className="update-btn" disabled={loadingPrice}>
            {loadingPrice ? "Updating..." : "Update Price"}
          </button>
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
              name="landmark"
              placeholder="Landmark"
              value={formData.landmark}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={formData.area}
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
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
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
          <button type="submit" className="update-btn" disabled={loadingAddress}>
            {loadingAddress ? "Updating..." : "Update Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessUpdateDetails;
