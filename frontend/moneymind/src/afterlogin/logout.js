import React, { useContext, useEffect } from "react";
import { Context } from "../context/context";
import { useNavigate } from "react-router-dom";
import { csrfToken } from "../utility";

const Logout = () => {
    const { logout } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                const csrfTokens = csrfToken();  // Ensure this function returns a string
                const logoutUser = await fetch('/logout/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfTokens
                    }
                });
                
                if (logoutUser.ok) {
                    logout();  // Trigger logout from context
                    navigate('/login');  // Redirect to login page
                } else {
                    console.error("Logout failed", logoutUser.statusText);
                }
            } catch (e) {
                console.error("Unable to logout", e);
            }
        };

        performLogout();
    }, [logout, navigate]);  // Dependencies array ensures useEffect runs when these change

    return (
        <div>
            Logging out...
        </div>
    );
}

export default Logout;
