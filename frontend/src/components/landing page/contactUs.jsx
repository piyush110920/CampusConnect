import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false); // New state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true); // Disable button and show "Sending..."

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('📨 ' + data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('❌ Failed to send: ' + data.message);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      alert('❌ Something went wrong.');
    } finally {
      setIsSending(false); // Re-enable button
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2 className="contact-title">Contact CampusConnect</h2>

        <div className="typewriter-text contact-typewriter">
          <Typewriter
            options={{
              strings: [
                ' Drop us your message',
                ' Share your ideas or feedback',
                ' Let’s build a better experience!',
              ],
              autoStart: true,
              loop: true,
              delay: 40,
              deleteSpeed: 20,
              pauseFor: 2000,
            }}
          />
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Message 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
