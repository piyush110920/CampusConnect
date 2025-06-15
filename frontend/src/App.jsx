import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/landing page/landing.jsx';
import SignupPage from './components/signup page/signup.jsx';
import ContactUs from './components/landing page/contactUs.jsx';
import ScrollToTop from './components/ScrollToTop.jsx'; // Import
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
      </Routes>
    </BrowserRouter>

  );
}

export default App;
