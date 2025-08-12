# 📚 CampusConnect
<p align="right">
    <img width="400"  alt="logo" src="https://github.com/user-attachments/assets/95648b44-4029-49f2-9fff-7f9328264074"/>

</p>

**CampusConnect** is a full-stack web application designed to connect students with their hostel room providers and mess service providers. It offers role-based dashboards for students, mess providers, and room providers, enabling profile management, service updates, and communication.

<p align="center">
  <img <img width="1000" height="1024" alt="interface" src="https://github.com/user-attachments/assets/67b7b008-7f45-4e97-a907-61160bb55c8b"  alt="CampusConnect Interface" width="600" />
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
---
# 📸 Screenshots
## 🏠 Landing Page
<p align="center"> <img src="https://github.com/user-attachments/assets/046a0d6a-ea13-4c11-a821-6993804c86b5" alt="Landing Page Full View" width="100%" /> </p>

## 📱 Mobile View Landing Page
<p align="center"> <img src="https://github.com/user-attachments/assets/6c44005d-b00b-40b7-b523-7008448da49d" alt="Landing Page Mobile View" width="350" /> </p>

## Sign Up page 
<p align="center"> <img width="1919" height="877" alt="Screenshot 2025-08-12 124145" src="https://github.com/user-attachments/assets/c7105375-4037-4011-bb01-f6c6717357c7" />

## Sign In page 
<p align="center"> <img width="1919" height="873" alt="Screenshot 2025-08-12 124157" src="https://github.com/user-attachments/assets/7b5b2ebe-b21a-4380-be4f-082854eda1b5" />

## Student Dashboard 
<p align="center"> <img width="1919" height="878" alt="Screenshot 2025-08-12 123934" src="https://github.com/user-attachments/assets/f29d6568-e1fd-4c3d-a386-553946666445" />
<p align="center"> <img width="1919" height="879" alt="Screenshot 2025-08-12 123920" src="https://github.com/user-attachments/assets/1283fe04-19cd-4f3a-ae1e-5df713f68317" />

## Mess Provider Dashboard 
<p align="center"> <img width="1919" height="878" alt="Screenshot 2025-08-12 124014" src="https://github.com/user-attachments/assets/07ca5b1f-4417-4a9a-8d27-e1305589cd83" />
<p align="center"> <img width="1919" height="876" alt="Screenshot 2025-08-12 123959" src="https://github.com/user-attachments/assets/52c3398e-0182-49b8-af7f-8e236b4556ff" />

## Room Provider Dashboard 
<p align="center"> <img width="1919" height="877" alt="Screenshot 2025-08-12 124108" src="https://github.com/user-attachments/assets/4c881efc-02be-42f3-877f-7c92411370a4" />
<p align="center"> <img width="1919" height="873" alt="Screenshot 2025-08-12 124059" src="https://github.com/user-attachments/assets/90dd72ef-cc13-439f-8e73-e998505379ea" />
    
---

## 📜 License
This project is licensed under the  **[MIT License](https://opensource.org/licenses/MIT)**.
