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
  password: String,
  role: {
    type: String,
    default: 'mess',
  },
});

module.exports = mongoose.model('MessProvider', messProviderSchema);
