import React from 'react';
import './Suggestions.css';
import room1 from '../../../assets/logos/l1.png';
import mess1 from '../../../assets/logos/l2.png';

const Suggestions = () => {
  const dummyCards = Array(6).fill(0); // You can replace this with real data

  return (
    <div className="suggestions-page">
      <div className="suggestions-container">

        {/* Left: Room Services */}
        <div className="service-column">
          <h3 className="section-title">Nearest Room Service</h3>
          <div className="card-scroll">
            {dummyCards.map((_, index) => (
              <div className="service-card" key={`room-${index}`}>
                <div className="card-content">
                  <div className="card-info">
                    <p><strong>Service Name:</strong> Akshay Apartment</p>
                    <p><strong>Service Provider:</strong> John Doe</p>
                    <p><strong>Location:</strong> ABC Street, Pune</p>
                    <p><strong>Price:</strong> ₹6000/month</p>
                    <p><strong>Note:</strong> Non-independent, Gate Time 05:00–11:00</p>
                  </div>
                  <div className="card-logo">
                    <img src={room1} alt="room" className="card-img" />
                    <button className="interested-btn">Interested</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mess Services */}
        <div className="service-column">
          <h3 className="section-title">Nearest Mess Service</h3>
          <div className="card-scroll">
            {dummyCards.map((_, index) => (
              <div className="service-card" key={`mess-${index}`}>
                <div className="card-content">
                  <div className="card-info">
                    <p><strong>Service Name:</strong> Uncle Mess</p>
                    <p><strong>Service Provider:</strong> Chef Kumar</p>
                    <p><strong>Location:</strong> XYZ Lane, Pune</p>
                    <p><strong>Price:</strong> ₹2500/month</p>
                    <p><strong>Note:</strong> 13 days/week, Sunday evening off</p>
                  </div>
                  <div className="card-logo">
                    <img src={mess1} alt="mess" className="card-img" />
                    <button className="interested-btn">Interested</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Suggestions;
