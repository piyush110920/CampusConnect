import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('📨 Your message has been sent!');
    setFormData({ name: '', email: '', message: '' });
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

          <button type="submit">Send Message 🚀</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
