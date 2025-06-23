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
    <div className="std-contact-container">
      <form className="std-contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>FULL NAME:</label>
          <input type="text" value="Already Filled" readOnly />
        </div>

        <div className="form-group">
          <label>EMAIL ID:</label>
          <input type="email" value="Already Filled" readOnly />
        </div>

        <div className="form-group">
          <label>MESSEGE:</label>
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="submit-wrapper">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default StdContactus;
