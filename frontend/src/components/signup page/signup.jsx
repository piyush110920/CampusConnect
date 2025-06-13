import React from "react";
import StudentSignup from "./StudentSignup";
import Navbar from "./Navbarsignup";
import "./signup.css"; 
import Footer from "../landing page/footer";

const Signup = () => {
    return (
        <div className="signup-page">
            <Navbar />
            <StudentSignup />
            <div>
                <Footer/>
            </div>
            
        </div>
    );
};

export default Signup;