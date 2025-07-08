const mongoose = require('mongoose');

const roomRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomProvider',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('RoomRequest', roomRequestSchema);
