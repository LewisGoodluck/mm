import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import "./App.css"; // Import the external CSS
import Homepage from "./components/Homepage";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

const App = () => {
    return (
        <BrowserRouter>
            <div className="navbar">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/profile">profile</Link>
                </div>
            </div>

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
