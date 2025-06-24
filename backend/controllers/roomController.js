const RoomProvider = require("../models/RoomProvider");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const signupOtpStore = {}; // For signup
const resetOtpStore = {};  // For password reset

exports.generateOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendOtp(email, otp);
    signupOtpStore[email] = otp;
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

exports.signupRoomProvider = async (req, res) => {
  const {
    fullName, email, phone, messName,
    plotNumber, street, landmark, city, pincode,
    password, otp, confirmPassword
  } = req.body;

  if (signupOtpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    const existing = await RoomProvider.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRoom = new RoomProvider({
      fullName,
      email,
      phone,
      messName,
      address: { plotNumber, street, landmark, city, pincode },
      password: hashedPassword,
      role: "room"
    });

    await newRoom.save();
    delete signupOtpStore[email];
    res.status(201).json({ message: "Room Provider registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed. Try again." });
  }
};

exports.loginRoomProvider = async (req, res) => {
  const { email, password } = req.body;

  try {
    const room = await RoomProvider.findOne({ email });
    if (!room) return res.status(404).json({ message: "Email not registered." });

    const isMatch = await bcrypt.compare(password, room.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password." });

    const token = generateToken({ id: room._id, role: room.role });

    return res.status(200).json({
      message: "Login successful",
      token,
      role: room.role
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed due to server error." });
  }
};

exports.sendRoomResetOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const user = await RoomProvider.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not registered." });

    await sendOtp(email, otp);
    resetOtpStore[email] = otp;

    res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

exports.resetRoomPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!resetOtpStore[email] || resetOtpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  try {
    const room = await RoomProvider.findOne({ email });
    if (!room) return res.status(404).json({ message: "Email not registered." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    room.password = hashedPassword;
    await room.save();

    delete resetOtpStore[email];

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password." });
  }
};
