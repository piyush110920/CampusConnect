import React, { useEffect, useState } from "react";
import './Suggestions.css';
import {
  fetchSuggestions,
  addStudentSuggestion,
  fetchStudentProfile
} from "../../../services/api";

const Suggestions = () => {
  const [messes, setMesses] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch all available providers
    fetchSuggestions(token).then(data => {
      setMesses(data.messes);
      setRooms(data.rooms);
    });

    // Fetch student profile including selectedMess/Room and request status
    fetchStudentProfile(token).then(setStudent);
  }, []);

  const handleInterested = async (type, id) => {
    const token = localStorage.getItem("token");
    const confirm = window.confirm(`Are you sure you want to request this ${type}?`);
    if (!confirm) return;

    await addStudentSuggestion(token, type, id);
    alert("Your request has been sent!");

    // Refresh profile to update UI
    const updatedProfile = await fetchStudentProfile(token);
    setStudent(updatedProfile);
  };

  return (
    <div className="suggestions-page">
      <div className="suggestions-container">

        {/* Mess Services */}
        <div className="service-column">
          <h3 className="section-title">Available Mess Services</h3>
          <div className="card-scroll">
            {messes.map(mess => {
              const isRequested = student?.selectedMess?._id === mess._id;
              const isPending = student?.messRequestStatus === "Pending";

              return (
                <div className="service-card" key={mess._id}>
                  <div className="card-content">
                    <div className="card-info">
                      <p><strong>Name:</strong> {mess.companyName}</p>
                      <p><strong>Provider:</strong> {mess.fullName}</p>
                      <p><strong>Location:</strong> {mess.address?.area}, {mess.address?.city}</p>
                      <p><strong>Price:</strong> ₹{mess.monthlyPrice}/month</p>
                    </div>
                    <button
                      className="interested-btn"
                      onClick={() => handleInterested("mess", mess._id)}
                      disabled={isRequested || isPending}
                    >
                      {isRequested ? "Requested" : isPending ? "Pending" : "Send Request"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Room Services */}
        <div className="service-column">
          <h3 className="section-title">Available Room Services</h3>
          <div className="card-scroll">
            {rooms.map(room => {
              const isRequested = student?.selectedRoom?._id === room._id;
              const isPending = student?.roomRequestStatus === "Pending";

              return (
                <div className="service-card" key={room._id}>
                  <div className="card-content">
                    <div className="card-info">
                      <p><strong>Name:</strong> {room.companyName}</p>
                      <p><strong>Provider:</strong> {room.fullName}</p>
                      <p><strong>Location:</strong> {room.address?.area}, {room.address?.city}</p>
                      <p><strong>Price:</strong> ₹{room.monthlyPrice}/month</p>
                    </div>
                    <button
                      className="interested-btn"
                      onClick={() => handleInterested("room", room._id)}
                      disabled={isRequested || isPending}
                    >
                      {isRequested ? "Requested" : isPending ? "Pending" : "Send Request"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Suggestions;
