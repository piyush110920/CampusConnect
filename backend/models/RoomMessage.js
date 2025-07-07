// models/RoomMessage.js
const mongoose = require("mongoose");

const roomMessageSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomProvider",
    },
    studentName: String,
    studentPhone: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoomMessage", roomMessageSchema);
