import React, { useEffect, useState } from "react";
import './Suggestions.css';
import { fetchSuggestions, addStudentSuggestion, fetchStudentProfile } from "../../../services/api";

const Suggestions = () => {
  const [messes, setMesses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [student, setStudent] = useState(null); // 👈 to track selectedMess/Room

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch available services
    fetchSuggestions(token)
      .then(data => {
        setMesses(data.messes);
        setRooms(data.rooms);
      })
      .catch(err => console.error("Error loading suggestions:", err));

    // Fetch student's current selection
    fetchStudentProfile(token)
      .then(data => setStudent(data))
      .catch(err => console.error("Error loading student profile:", err));
  }, []);

  const handleInterested = (type, id) => {
    const token = localStorage.getItem("token");

    const confirmChange = window.confirm(`Are you sure you want to select this ${type}? It will replace your previous choice.`);
    if (!confirmChange) return;

    addStudentSuggestion(token, type, id)
      .then(() => {
        alert("Updated your selection!");
        return fetchStudentProfile(token); // Refresh selectedMess/Room
      })
      .then(data => setStudent(data))
      .catch(err => console.error("Error updating suggestion:", err));
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
                    <p><strong>Price:</strong> ₹{room.monthlyPrice}/month</p>

                  </div>
                  <div className="card-logo">
                    <button
                      className="interested-btn"
                      onClick={() => handleInterested("room", room._id)}
                      disabled={student?.selectedRoom?._id === room._id}
                    >
                      {student?.selectedRoom?._id === room._id ? "Selected" : "Interested"}
                    </button>
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
                    <p><strong>Price:</strong> ₹{mess.monthlyPrice}/month</p>

                  </div>
                  <div className="card-logo">
                    <button
                      className="interested-btn"
                      onClick={() => handleInterested("mess", mess._id)}
                      disabled={student?.selectedMess?._id === mess._id}
                    >
                      {student?.selectedMess?._id === mess._id ? "Selected" : "Interested"}
                    </button>
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
