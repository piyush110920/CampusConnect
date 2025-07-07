const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  college: String,
  phone: String,
  address: {
    plotNumber: String,
    landmark: String,
    area: String,
    city: String,
    state: String,
    country: String,
    pinCode: String
  },
  role: {
    type: String,
    default: 'student'
  },
  selectedMess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessProvider',
    default: null
  },
  selectedRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomProvider',
    default: null
  },
  // ✅ Add these new fields
  selectedMessDate: {
    type: Date,
    default: null
  },
  selectedRoomDate: {
    type: Date,
    default: null
  },
  // models/Student.js

selectedMessRating: {
  type: Number,
  min: 1,
  max: 5,
  default: null
},
selectedRoomRating: {
  type: Number,
  default: 0
},


});

module.exports = mongoose.model('Student', studentSchema);
