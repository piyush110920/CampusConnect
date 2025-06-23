import React from 'react';
import './Suggestions.css';
import room1 from '../../../assets/logos/l1.png';
import mess1 from '../../../assets/logos/l2.png';
import chatbotIcon from '../../../assets/chat.png';

const Suggestions = () => {
  const dummyCards = Array(6).fill(0); // Example list of 6 cards

  return (
    <div className="suggestions-page">
      <div className="suggestions-container">
        {/* Room Services */}
        <div className="service-column">
          <h3 className="section-title">NEAREST ROOM SERVICE</h3>
          <div className="card-scroll">
            {dummyCards.map((_, index) => (
              <div className="service-card" key={`room-${index}`}>
                <div className="card-content">
                  <div className="card-info">
                    <p><strong>SERVICE NAME:</strong> Akshay Apartment</p>
                    <p><strong>SERVICE PROVIDER NAME:</strong> John Doe</p>
                    <p><strong>LOCATION:</strong> ABC Street, Pune</p>
                    <p><strong>PRICE:</strong> ₹6000/month</p>
                    <p><strong>NOTE:</strong> NON-INDEPENDENT AND GATE TIME IS 05:00–11:00</p>
                  </div>
                  <div className="card-logo">
                    <img src={room1} alt="room" className="card-img" height="60px" width="200px" />
                    <button className="interested-btn">Interested</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mess Services */}
        <div className="service-column">
          <h3 className="section-title">NEAREST MESS SERVICE</h3>
          <div className="card-scroll">
            {dummyCards.map((_, index) => (
              <div className="service-card" key={`mess-${index}`}>
                <div className="card-content">
                  <div className="card-info">
                    <p><strong>SERVICE NAME:</strong> Uncle Mess</p>
                    <p><strong>SERVICE PROVIDER NAME:</strong> Chef Kumar</p>
                    <p><strong>LOCATION:</strong> XYZ Lane, Pune</p>
                    <p><strong>PRICE:</strong> ₹2500/month</p>
                    <p><strong>NOTE:</strong> 13 DAYS IN A WEEK, SUNDAY EVENING OFF</p>
                  </div>
                  <div className="card-logo">
                    <img src={mess1} alt="mess" className="card-img" height="70px" width="100 px" />
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