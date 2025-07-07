// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // Optional: For logging

dotenv.config(); // Load env vars

// Routes
const studentRoutes = require('./routes/studentRoutes');
const roomRoutes = require('./routes/roomRoutes');
const messRoutes = require('./routes/messRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// ---------- Middleware ----------
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Update this if using different frontend port/domain
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev')); // Optional logging for requests

// ---------- API Routes ----------
app.use('/api/student', studentRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/mess', messRoutes);
app.use('/api/contact', contactRoutes);

// ---------- Database & Server ----------
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
