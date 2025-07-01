const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  college: String,
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

  // ✅ Corrected references
  selectedMess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessProvider',
    default: null
  },
  selectedRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomProvider',
    default: null
  }
});

module.exports = mongoose.model('Student', studentSchema);
