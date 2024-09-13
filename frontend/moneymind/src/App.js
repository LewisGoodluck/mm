
import React, { useState } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css"; // Import the external CSS
import Homepage from "./components/Homepage";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./context/navbar";
import { ContextProvider } from "./context/context";
import Dashboard from "./afterlogin/dashboard";
import Logout from "./afterlogin/logout";
import InvestorProfile from "./afterlogin/investorProfile"
import CustomerProfile from "./afterlogin/CustomerProfile";

const App = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <ContextProvider>
            <BrowserRouter>
                <Navbar toggleMenu={toggleMenu} menuOpen={menuOpen} />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<PrivateRoute element={<Profile />}/>}/>
                    <Route path="/investorProfile" element={<PrivateRoute element={<InvestorProfile />} />} />
                    <Route path="/customerProfile" element={<PrivateRoute element={<CustomerProfile />} />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/logout" element={<PrivateRoute element={<Logout />} />} />
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    );
};

export default App;
