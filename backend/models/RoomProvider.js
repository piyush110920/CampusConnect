const mongoose = require('mongoose');

const roomProviderSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  messName: String,
  address: {
    plotNumber: String,
    street: String,
    landmark: String,
    city: String,
    pincode: String,
  },
  password: String,
  role: {
    type: String,
    default: 'room',
  },
});

module.exports = mongoose.model('RoomProvider', roomProviderSchema);
