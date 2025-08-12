# 🖥️ CampusConnect Backend

The **backend** of CampusConnect is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB**. It handles authentication, database operations, and serves data to the frontend through secure, role-based routes.

---

## 🚀 Features
- **User Authentication** with JWT
- **Role-based Access Control** (Student, Room Provider, Mess Provider)
- **MongoDB Atlas** for cloud database
- **Email OTP Verification** with Nodemailer
- API endpoints for:
  - Student management
  - Room management
  - Mess management

---

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Authentication:** JWT
- **Email Service:** Nodemailer
- **Environment Variables:** Dotenv
- **Security:** bcrypt.js, CORS

---

## 📂 Folder Structure
```
backend/
├── controllers/        # API logic
│   ├── studentController.js      # Signup, login, profile
│   ├── roomController.js         # Room assignment, fetch
│   └── messController.js         # Mess assignment, fetch
│
├── models/             # Mongoose schemas
│   ├── Student.js
│   ├── Room.js
│   └── Mess.js
│
├── routes/             # API routes
│   ├── studentRoutes.js          # /api/student
│   ├── roomRoutes.js             # /api/room
│   └── messRoutes.js             # /api/mess
│
├── utils/              # Utility functions
│   ├── sendOtp.js                # Send OTP via email
│   └── generateToken.js          # Generate JWT
│
├── middleware/         # Middlewares
│   └── authMiddleware.js         # JWT protection
│
├── server.js           # Server startup & DB connection
├── .env                # Environment variables
└── package.json        # Dependencies & scripts
```

---

## ⚙️ Installation & Setup
### 1️⃣ Navigate to Backend Folder
```bash
cd backend
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Create `.env` File
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=100d
EMAIL_USER=your_email
EMAIL_PASS=your_email_secret
```
### 4️⃣ Run Server
```bash
npm start
```

---

## 📜 License
This project is licensed under the **[MIT License](https://opensource.org/licenses/MIT)**.
