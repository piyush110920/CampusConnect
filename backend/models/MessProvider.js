const mongoose = require('mongoose');

const messProviderSchema = new mongoose.Schema({
  fullName: String,
  companyName: String,
  email: String,
  phone: String,
  address: {
    plotNumber: String,
    landmark: String,
    area: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
  },
  monthlyPrice: {
    type: Number,
    required: true,
  },
  password: String,
  role: {
    type: String,
    default: 'mess',
  },
  averageRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  ratingSum: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('MessProvider', messProviderSchema);
