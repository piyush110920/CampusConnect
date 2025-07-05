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
  monthlyPrice: {
    type: Number,
    required: true  // Ensure the provider enters a price during signup
  },
  ratingSum: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  connectionCount: {
  type: Number,
  default: 0
}

});

module.exports = mongoose.model('RoomProvider', roomProviderSchema);
