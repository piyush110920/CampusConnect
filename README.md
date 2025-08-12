# 📚 CampusConnect

**CampusConnect** is a full-stack web application designed to connect students with their hostel room providers and mess service providers. It offers role-based dashboards for students, mess providers, and room providers, enabling profile management, service updates, and communication.

---

## 🚀 Features

### 👨‍🎓 Student
- Sign up & log in with OTP verification
- View profile details
- View assigned room & mess provider details

### 🍽 Mess Provider
- Update phone number, monthly price, and address
- Manage mess details

### 🏠 Room Provider
- Update contact info, monthly rent, and address
- Manage available rooms

### 🔐 Security
- JWT-based authentication
- Role-based protected routes

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- CSS Modules
- React Icons

**Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Nodemailer (OTP sending)

---

## 📂 Folder Structure

```
CampusConnect/
├── backend/           ← Express + MongoDB (API server)
├── frontend/          ← React + Vite (Client app)
└── README.md          ← Optional documentation

backend/
├── controllers/
│   ├── studentController.js      # signup, login, profile
│   ├── roomController.js         # room assignment, fetch
│   └── messController.js         # mess assignment, fetch
├── models/
│   ├── Student.js                # Student schema
│   ├── Room.js                   # Room schema
│   └── Mess.js                   # Mess schema
├── routes/
│   ├── studentRoutes.js          # /api/student
│   ├── roomRoutes.js             # /api/room
│   └── messRoutes.js             # /api/mess
├── utils/
│   ├── sendOtp.js                # Sends OTP via email
│   └── generateToken.js          # Generates JWT token
├── middleware/
│   └── authMiddleware.js         # Protects routes using JWT
├── server.js                     # Starts express server + connects MongoDB
├── .env                          # MONGO_URI, JWT_SECRET, PORT
└── package.json                  # Express, Mongoose, Dotenv, CORS, etc.




components/
├── landing page/
├── login page/
├── profile page/
│   ├── messProvider/
│   ├── RoomProvider/
│   └── student/
│       ├── Dashboard.jsx
│       ├── Dashboard.css
│       ├── messServices.jsx
│       ├── Navbar.jsx
│       ├── Navbar.css
│       ├── profilepage.jsx
│       ├── profilepage.css
│       ├── roomServices.jsx
│       ├── Services.css
│       └── Sidebar.jsx
├── signup page/
├── particle.jsx
└── ScrollToTop.jsx

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/piyush110920/CampusConnect.git
cd CampusConnect
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/`:
```
# Server configuration
PORT=5000

# MongoDB Atlas connection URI
MONGO_URI= Your_mongoDB_URI
# JWT secret key for authentication
JWT_SECRET= Anything_you_want
JWT_EXPIRES_IN=100d

# Email credentials
EMAIL_USER=your_email_id
EMAIL_PASS=your_EMAIL_secret_key

```
Run the backend:
```bash
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 📸 Screenshots
*(Add screenshots of your app here)*

---

## 📜 License
This project is licensed under the  **[MIT License](https://opensource.org/licenses/MIT)**.
