const jwt = require("jsonwebtoken");
const RoomProvider = require("../models/RoomProvider");
const MessProvider = require("../models/MessProvider");

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for presence and format of the token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token using secret from env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (e.g., { id, role }) to request object
    req.user = decoded;

    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};


/// For mess provider
exports.authenticateMess = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'mess') {
      return res.status(403).json({ message: "Access denied: not a mess provider" });
    }

    req.user = decoded; // ✅ this is crucial
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


exports.authenticateRoom = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const roomUser = await RoomProvider.findById(decoded.id);

    if (!roomUser) {
      return res.status(401).json({ message: "Room provider not found" });
    }

    req.user = { id: roomUser._id };
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ message: "Authentication failed" });
  }
};