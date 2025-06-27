import React, { useEffect, useState } from "react";
import './Suggestions.css';
import { fetchSuggestions, addStudentSuggestion } from "../../../services/api";

const Suggestions = () => {
  const [messes, setMesses] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchSuggestions(token).then(data => {
      setMesses(data.messes);
      setRooms(data.rooms);
    }).catch(err => console.error("Error loading suggestions:", err));
  }, []);

  const handleInterested = (type, id) => {
    const token = localStorage.getItem("token");
    addStudentSuggestion(token, type, id)
      .then(() => alert("Added to your profile!"))
      .catch((err) => console.error("Error adding suggestion:", err));
  };

  return (
    <div className="suggestions-page">
      <div className="suggestions-container">

        {/* Room Services */}
        <div className="service-column">
          <h3 className="section-title">Available Room Services</h3>
          <div className="card-scroll">
            {rooms.map(room => (
              <div className="service-card" key={room._id}>
                <div className="card-content">
                  <div className="card-info">
                    <p><strong>Room Name:</strong> {room.messName}</p>
                    <p><strong>Service Provider:</strong> {room.fullName}</p>
                    <p><strong>Location:</strong> {room.address?.street}, {room.address?.city}</p>
                    <p><strong>Price:</strong> ₹{room.price}/month</p>
                  </div>
                  <div className="card-logo">
                    <button className="interested-btn" onClick={() => handleInterested("room", room._id)}>Interested</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mess Services */}
        <div className="service-column">
          <h3 className="section-title">Available Mess Services</h3>
          <div className="card-scroll">
            {messes.map(mess => (
              <div className="service-card" key={mess._id}>
                <div className="card-content">
                  <div className="card-info">
                    <p><strong>Service Name:</strong> {mess.companyName}</p>
                    <p><strong>Service Provider:</strong> {mess.fullName}</p>
                    <p><strong>Location:</strong> {mess.address?.area}, {mess.address?.city}</p>
                    <p><strong>Price:</strong> ₹{mess.price}/month</p>
                  </div>
                  <div className="card-logo">
                    <button className="interested-btn" onClick={() => handleInterested("mess", mess._id)}>Interested</button>
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
