// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const roomRoutes = require('./routes/roomRoutes');
const messRoutes = require('./routes/messRoutes');
require('dotenv').config();
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/student', studentRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/mess', messRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })


.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch(err => console.error('❌ DB connection error:', err));
