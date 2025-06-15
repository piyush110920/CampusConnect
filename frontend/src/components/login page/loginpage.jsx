// loginpage.jsx
import React from 'react';
import './loginpage.css';
import LoginNavbar from './loginNavbar';
import LoginForm from './loginform';
import Footer from '../landing page/footer'; // Adjust if path differs

const LoginPage = () => {
  return (
    <div className="login-full-page">
      <LoginNavbar />
      <div className="login-container">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

