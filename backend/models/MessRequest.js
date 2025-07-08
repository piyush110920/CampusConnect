const mongoose = require('mongoose');

const messRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  mess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MessProvider',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('MessRequest', messRequestSchema);
