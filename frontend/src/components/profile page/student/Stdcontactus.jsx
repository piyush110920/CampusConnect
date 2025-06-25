import React, { useState } from 'react';
import './StdContactus.css';

const StdContactus = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message submitted!');
    setMessage('');
  };

  return (
    <div className="std-contact-wrapper">
      {/* Left: Contact Info Card */}
      

      {/* Right: Contact Form Card */}
      <div className="contact-card form-card">
        <h2 className="std-contact-heading">Contact Admin Support</h2>
        <form className="std-contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" value="Already Filled" readOnly />
          </div>

          <div className="form-group">
            <label>Email ID:</label>
            <input type="email" value="Already Filled" readOnly />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="submit-wrapper">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="contact-card info-card">
        <h3>CONTACT INFORMATION</h3>
        <ul>
          <li><strong>Email:</strong> studenthelp@gmail.com</li>
          <li><strong>Phone:</strong> +91 9876543210</li>
          <li><strong>Facebook:</strong> /student.portal</li>
          <li><strong>LinkedIn:</strong> /in/studentportal</li>
          <li><strong>Instagram:</strong> @student_portal</li>
          <li><strong>Address:</strong> 123, ABC Street, Pune, India</li>
        </ul>
      </div>
    </div>
  );
};

export default StdContactus;
