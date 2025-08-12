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
├── backend/
│   ├── controllers/
│   │   ├── studentController.js
│   │   ├── roomController.js
│   │   └── messController.js
│   ├── models/
│   │   ├── Student.js
│   │   ├── Room.js
│   │   └── Mess.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── roomRoutes.js
│   │   └── messRoutes.js
│   ├── utils/
│   │   ├── sendOtp.js
│   │   └── generateToken.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── components/
│   │   ├── landing page/
│   │   ├── login page/
│   │   ├── profile page/
│   │   │   ├── messProvider/
│   │   │   ├── RoomProvider/
│   │   │   └── student/
│   │   ├── signup page/
│   │   ├── particle.jsx
│   │   └── ScrollToTop.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/CampusConnect.git
cd CampusConnect
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/`:
```
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=5000
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
