const MessProvider = require("../models/MessProvider");
const sendOtp = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MessMessage = require("../models/MessMessage");
const MessRequest = require("../models/MessRequest");
const Student = require("../models/Student");

const otpStore = {};
const resetOtpStore = {}; // Store for password reset OTPs

exports.generateOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await sendOtp(email, otp);
    otpStore[email] = otp;
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP." });
  }
};
exports.signupMessProvider = async (req, res) => {
  const {
    fullName, companyName, email, phone,
    plotNumber, landmark, area, city, state,
    country, pincode, monthlyPrice, password, otp // ✅ monthlyPrice added here
  } = req.body;

  if (otpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    const existing = await MessProvider.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMess = new MessProvider({
      fullName,
      companyName,
      email,
      phone,
      address: { plotNumber, landmark, area, city, state, country, pincode },
      monthlyPrice, // ✅ monthlyPrice added here
      password: hashedPassword
    });

    await newMess.save();
    delete otpStore[email];
    res.status(201).json({ message: "Mess Provider registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed. Try again." });
  }
};

// ✅ NEW: Login Controller for Mess Provider
exports.loginMessProvider = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mess = await MessProvider.findOne({ email });
    if (!mess) return res.status(404).json({ message: "Email not registered." });

    const isMatch = await bcrypt.compare(password, mess.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    const token = jwt.sign({ id: mess._id, role: mess.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({ token, message: "Login successful", role: mess.role });
  } catch (err) {
    console.error("Mess Login Error:", err);
    res.status(500).json({ message: "Login failed." });
  }
};

exports.sendMessResetOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const user = await MessProvider.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not registered." });

    await sendOtp(email, otp);
    resetOtpStore[email] = otp;
    res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

// Reset password
exports.resetMessPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!resetOtpStore[email] || resetOtpStore[email] !== otp) {
    return res.status(400).json({ message: "Invalid or expired OTP." });
  }

  try {
    const mess = await MessProvider.findOne({ email });
    if (!mess) return res.status(404).json({ message: "Email not registered." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    mess.password = hashedPassword;
    await mess.save();

    delete resetOtpStore[email];
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reset password." });
  }
};

// Get Mess Provider Profile
// GET /api/mess/mess-profilepage
exports.getMessProfile = async (req, res) => {
  try {
    const mess = await MessProvider.findById(req.user.id).select("-password");

    if (!mess) return res.status(404).json({ message: "Mess provider not found" });

    // Assume rating & connectionCount are stored in DB
    res.json({
      fullName: mess.fullName,
      companyName: mess.companyName,
      email: mess.email,
      phone: mess.phone,
      address: mess.address,
      monthlyPrice: mess.monthlyPrice,
      averageRating: mess.averageRating || 0,
      ratingCount: mess.ratingCount || 0,
      connectionCount: mess.connectionCount || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mess profile" });
  }
};
exports.getMessMessages = async (req, res) => {
  try {
    const messId = req.user.id; // ✅ This depends on authenticateMess setting req.user

    const messages = await MessMessage.find({ messId }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
};


exports.getMessRequests = async (req, res) => {
  try {
    const messId = req.user.id;

    const requests = await MessRequest.find({ mess: messId })
      .populate('student')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Fetch Mess Requests Error:", err);
    res.status(500).json({ message: "Failed to load mess requests" });
  }
};
exports.acceptMessRequest = async (req, res) => {
  const { studentId } = req.body;
  const messId = req.user.id;

  try {
    const request = await MessRequest.findOne({ student: studentId, mess: messId });
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Update request status
    request.status = "Accepted";
    await request.save();

    // Update student profile with selected mess info
    await Student.findByIdAndUpdate(
      studentId,
      {
        selectedMess: messId,
        selectedMessDate: new Date()
      },
      { new: true }
    );

    // Increment mess provider's connection count
    await MessProvider.findByIdAndUpdate(
      messId,
      { $inc: { connectionCount: 1 } }
    );

    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    console.error("Accept Mess Request Error:", error);
    res.status(500).json({ message: "Failed to accept request" });
  }
};

// Get mess requests for provider
// GET all pending mess requests for a provider
exports.getRoomRequests = async (req, res) => {
  try {
    const roomId = req.user.id;

    // Only fetch requests with status 'Pending'
    const requests = await RoomRequest.find({ room: roomId, status: 'Pending' })
      .populate("student", "fullName email college address")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    console.error("Error fetching room requests:", err);
    res.status(500).json({ message: "Failed to fetch room requests" });
  }
};


// Accept a request
exports.acceptRequest = async (req, res) => {
  try {
    const messId = req.user.id;
    const requestId = req.params.requestId;

    const request = await MessRequest.findById(requestId);
    if (!request || request.messId.toString() !== messId) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "Accepted";
    await request.save();

    const student = await Student.findById(request.studentId);
    student.selectedMess = messId;
    student.messRequestStatus = "Accepted";
    student.selectedMessDate = new Date();
    student.previousMess = null;
    await student.save();

    // Optional: increment connection count
    await MessProvider.findByIdAndUpdate(messId, { $inc: { connectionCount: 1 } });

    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    console.error("Accept request error:", error);
    res.status(500).json({ message: "Failed to accept request" });
  }
};


exports.getConnectedStudents = async (req, res) => {
  try {
    const messId = req.user.id;

    const acceptedRequests = await MessRequest.find({
      mess: messId,
      status: 'Accepted'
    }).populate('student');

    const connectedStudents = acceptedRequests.map(r => r.student);

    res.status(200).json(connectedStudents);
  } catch (err) {
    console.error("Fetch Connected Students Error:", err);
    res.status(500).json({ message: "Failed to fetch connected students" });
  }
};
