import React, { useEffect, useState } from 'react';
import './Roomcontactus.css';
import { fetchRoomProfile, sendStudentMessage } from '../../../services/api'; // ✅ updated

const Roomcontactus = () => {
  const [message, setMessage] = useState('');
  const [provider, setProvider] = useState({ fullName: '', email: '' }); // ✅ changed to provider
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setFeedback('Authentication token not found.');
      setLoading(false);
      return;
    }

    fetchRoomProfile(token) // ✅ fetch from room profile
      .then((data) => {
        setProvider({
          fullName: data.fullName,
          email: data.email,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching room provider data:', err);
        setFeedback('Failed to load provider information.');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setSubmitting(true);
    setFeedback('');

    // ✅ Prepend room provider info in message
    const formattedMessage = `🏠 Message from Room Provider\n\nMessage:\n${message}`;

    try {
      const res = await sendStudentMessage(token, provider.fullName, provider.email, formattedMessage);
      setFeedback(res.message || 'Message sent!');
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setFeedback('Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="room-contact-container">
      {/* Left: Contact Form */}
      <div className="room-contact-card">
        <h2 className="room-contact-heading">Contact Admin Support</h2>

        {loading ? (
          <p>Loading provider info...</p>
        ) : (
          <form className="room-contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" value={provider.fullName} readOnly />
            </div>

            <div className="form-group">
              <label>Email ID:</label>
              <input type="email" value={provider.email} readOnly />
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
              <button type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Submit'}
              </button>
            </div>

            {feedback && <p className="feedback">{feedback}</p>}
          </form>
        )}
      </div>

      {/* Right: Contact Info */}
      <div className="room-contact-card contact-info-card">
        <h3>Contact Information</h3>
        <ul className="contact-info-list">
          <li><strong>Email:</strong> inf.campusconnect@gmail.com</li>
          <li><strong>Phone:</strong> +91 9421686591</li>
          <li><strong>Facebook:</strong> /campusconnect</li>
          <li><strong>LinkedIn:</strong> www.linkedin.com/in/piyush110920</li>
          <li><strong>Instagram:</strong> @piyu_sh1120</li>
          <li><strong>Address:</strong> Plot Number 01, Jaitala Road, Near Raisoni College of Engineering, Vaishali Nagar, Hingna Road, Nagpur-440016</li>
        </ul>
      </div>
    </div>
  );
};

export default Roomcontactus;
