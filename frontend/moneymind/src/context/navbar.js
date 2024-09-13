import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./context";

const Navbar = ({toggleMenu, menuOpen}) =>{
    const {logged} = useContext(Context)
    return(
        <>
            <div className="navbar">
            <div className="burger-menu" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
                {!logged && <Link to="/" onClick={toggleMenu}>Home</Link>}
                {!logged && <Link to="/about" onClick={toggleMenu}>About</Link>}
                {!logged && <Link to="/signup" onClick={toggleMenu}>Signup</Link>}
                {!logged && <Link to="/login" onClick={toggleMenu}>Login</Link>}
                {logged && <Link to="/profile" onClick={toggleMenu}>Profile</Link>}
                {logged && <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>}
                {logged && <Link to="/logout" onClick={toggleMenu}>Logout</Link>}
                {logged && <Link to="/investorProfile" onClick={toggleMenu}>my stack</Link>}


            </div>
            </div>
        </>
    )
}

export default Navbar