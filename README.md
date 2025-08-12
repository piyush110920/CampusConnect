# 📚 CampusConnect
<p align="center">
  <img src="assets/logo.png" alt="CampusConnect Logo" width="150" />
</p>

**CampusConnect** is a full-stack web application designed to connect students with their hostel room providers and mess service providers. It offers role-based dashboards for students, mess providers, and room providers, enabling profile management, service updates, and communication.

<p align="center">
  <img src="assets/interface.png" alt="CampusConnect Interface" width="600" />
</p>

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
