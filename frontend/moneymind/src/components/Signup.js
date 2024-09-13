import React, { useState } from "react";
import { csrfToken } from "../utility";
import './Signup.css'; // Import the stylesheet

const Signup = () => {
    const csrfTokens = csrfToken();
    const [alert, setAlert] = useState(false); // State to control alert visibility

    // Function to show the alert box
    const showAlert = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false); // Hide after 3 seconds
        }, 3000);
    };

    // investor data
    const [member, setMember] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        password2: ""
    });


    const handleMember = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // send investor data to backend
        try {
            const data = await fetch("/member/register", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'X-CSRFToken' : csrfTokens
                },
                body: JSON.stringify(member)
            });
            if (data.ok) {
                console.log("registration success");
                showAlert(); // Show the custom alert
            } else {
                const errResponse = await data.json();
                console.error("failed to register", errResponse);
            }
        } catch (error) {
            console.error("network error", error);
        }

        setMember({
            username: "",
            email: "",
            phone: "",
            password: "",
            password2: ""
        });
    };


    return (
        <div className="signup-wrapper">
            <div className="signup-front">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Step Into Greatness</h2>
                    <input
                        type="text"
                        name="username"
                        value={member.username}
                        onChange={handleMember}
                        placeholder="Username" required
                    />
                    <input
                        type="email"
                        name="email"
                        value={member.email}
                        onChange={handleMember}
                        placeholder="Email" required
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={member.phone}
                        onChange={handleMember}
                        placeholder="Phone" required
                    />
                    <input
                        type="password"
                        name="password"
                        value={member.password}
                        onChange={handleMember}
                        placeholder="Password" required
                    />
                    <input
                        type="password"
                        name="password2"
                        value={member.password2}
                        onChange={handleMember}
                        placeholder="Confirm Password" required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>

            {/* Custom Alert Box */}
            {alert && (
                <div className="custom-alert show">
                    Form submitted successfully!
                </div>
            )}
        </div>
    );
};

export default Signup;
