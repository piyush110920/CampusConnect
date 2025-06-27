const jwt = require("jsonwebtoken");

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
