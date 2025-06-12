import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/landing page/landing.jsx';
//import LoginPage from './components/login page/login.jsx';
//import SignupPage from './components/signup page/signup.jsx';
// ... other imports

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> */}
        {/* Add more routes for student, mess, room pages */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
