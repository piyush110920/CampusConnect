import React, { useEffect, useState } from 'react';
import './Stdcontactus.css';
import { fetchStudentProfile, sendStudentMessage } from '../../../services/api';

const Stdcontactus = () => {
  const [message, setMessage] = useState('');
  const [student, setStudent] = useState({ fullName: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setFeedback('Authentication token not found.');
      setLoading(false);
      return;
    }

    fetchStudentProfile(token)
      .then((data) => {
        setStudent({
          fullName: data.fullName,
          email: data.email,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching student data:', err);
        setFeedback('Failed to load student information.');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await sendStudentMessage(token, student.fullName, student.email, message);
      setFeedback(res.message);
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setFeedback('Failed to send message.');
    }
  };

  return (
    <div className="std-contact-container">
      {/* Left: Contact Form */}
      <div className="std-contact-card">
        <h2 className="std-contact-heading">Contact Admin Support</h2>

        {loading ? (
          <p>Loading student info...</p>
        ) : (
          <form className="std-contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" value={student.fullName} readOnly />
            </div>

            <div className="form-group">
              <label>Email ID:</label>
              <input type="email" value={student.email} readOnly />
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

            {feedback && <p className="feedback">{feedback}</p>}
          </form>
        )}
      </div>

      {/* Right: Contact Info */}
      <div className="std-contact-card contact-info-card">
        <h3>Contact Information</h3>
        <ul className="contact-info-list">
          <li><strong>Email:</strong> studenthelp@gmail.com</li>
          <li><strong>Phone:</strong> +91 9876543210</li>
          <li><strong>Facebook:</strong> /student.portal</li>
          <li><strong>LinkedIn:</strong> /in/studentportal</li>
          <li><strong>Instagram:</strong> @student_portal</li>
          <li><strong>Address:</strong> 123, ABCD Street, Pune, India</li>
        </ul>
      </div>
    </div>
  );
};

export default Stdcontactus;
