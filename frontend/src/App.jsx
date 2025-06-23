import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/landing page/landing.jsx';
import SignupPage from './components/signup page/signup.jsx';
import ContactUs from './components/landing page/contactUs.jsx';
import ScrollToTop from './components/ScrollToTop.jsx'; // Import
import LoginPage from "./components/login page/loginpage.jsx";
import ForgotPassword from "./components/login page/forgotPassword.jsx";
import ProfilePage from './components/profile page/student/ProfilePage';
import MessProfilePage from "./components/profile page/messProvider/MessProfilePage.jsx";
import MessForgotPassword from "./components/login page/messForgotpass.jsx";
import RoomForgotPassword from "./components/login page/roomForgotpass.jsx";

<Route path="/landing" element={<LandingPage />} />

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Add ScrollToTop component */}
      
      {/* ✅ Added LandingPage route */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} /> {/* ✅ added */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/student-forgot-password" element={<ForgotPassword/>}/>
        <Route path="/mess-forgot-password" element={<MessForgotPassword/>}/>
        <Route path="/room-forgot-password" element={<RoomForgotPassword/>}/>
        {/* <Route path="/*" element={<ProfilePage/>}/>
        <Route path="/mess-profile-page" element={<MessProfilePage/>}/> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
