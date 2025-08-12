# 🎨 CampusConnect Frontend

The **frontend** of CampusConnect is a single-page web application built using **React (Vite)**. It provides user interfaces for students, mess providers, and room providers with role-based dashboards.

---

## 🚀 Features
- **Role-Based Dashboards**
  - Student Dashboard
  - Mess Provider Dashboard
  - Room Provider Dashboard
- **Profile Management**
- **Service Updates** (Mess & Room details)
- **OTP-based Login**
- **Responsive UI**

---

## 🛠 Tech Stack
- **Framework:** React (Vite)
- **Styling:** CSS Modules
- **Icons:** React Icons
- **State Management:** React Hooks
- **Routing:** React Router DOM

---

## 📂 Folder Structure
```
frontend/
├── components/
│   ├── landing page/
│   ├── login page/
│   ├── profile page/
│   │   ├── messProvider/
│   │   ├── RoomProvider/
│   │   └── student/
│   │       ├── Dashboard.jsx
│   │       ├── Dashboard.css
│   │       ├── messServices.jsx
│   │       ├── Navbar.jsx
│   │       ├── Navbar.css
│   │       ├── profilepage.jsx
│   │       ├── profilepage.css
│   │       ├── roomServices.jsx
│   │       ├── Services.css
│   │       └── Sidebar.jsx
│   ├── signup page/
│   ├── particle.jsx
│   └── ScrollToTop.jsx
│
└── package.json
```

---

## ⚙️ Installation & Setup
### 1️⃣ Navigate to Frontend Folder
```bash
cd frontend
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Run Development Server
```bash
npm run dev
```
This will start the app on:
```
http://localhost:5173
```

---

## 📜 License
This project is licensed under the **[MIT License](https://opensource.org/licenses/MIT)**.
