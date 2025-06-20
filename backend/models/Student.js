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
  role: { type: String, default: 'student' }
});

module.exports = mongoose.model('Student', studentSchema);
