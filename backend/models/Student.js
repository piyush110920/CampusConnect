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

  // 🔽 NEW FIELDS TO TRACK STUDENT'S SELECTED PROVIDERS
  selectedMess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mess',
    default: null
  },
  selectedRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    default: null
  }
});

module.exports = mongoose.model('Student', studentSchema);
