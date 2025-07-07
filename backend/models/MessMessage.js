const mongoose = require("mongoose");

const messMessageSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  messId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MessProvider",
  },
  studentName: String,
  studentPhone: String,
  message: String,
}, { timestamps: true }); // Add this line

module.exports = mongoose.model("MessMessage", messMessageSchema);
