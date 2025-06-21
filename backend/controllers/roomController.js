const RoomProvider = require("../models/RoomProvider");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otpStore = {};

exports.generateOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendOtp(email, otp); // Send OTP via email
    otpStore[email] = otp;
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    console.error("OTP Send Error:", err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

exports.signupRoomProvider = async (req, res) => {
  const {
    fullName, email, phone, messName, plotNumber,
    street, landmark, city, pincode, password, otp
  } = req.body;

  if (otpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    const existing = await RoomProvider.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RoomProvider({
      fullName,
      email,
      phone,
      messName,
      address: { plotNumber, street, landmark, city, pincode },
      password: hashedPassword
    });

    await newUser.save();
    delete otpStore[email];
    res.status(201).json({ message: "Room Provider registered successfully!" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed. Try again." });
  }
};

exports.loginRoomProvider = async (req, res) => {
  const { email, password } = req.body;

  try {
    const room = await RoomProvider.findOne({ email });
    if (!room) return res.status(404).json({ message: "Email not registered." });

    const isMatch = await bcrypt.compare(password, room.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    const token = jwt.sign({ id: room._id, role: room.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({ token, message: "Login successful", role: room.role });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed." });
  }
};
