import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Context } from "../context/context";
import { csrfToken } from "../utility";

const Login = () => {
    const csrfTokens = csrfToken()
    const { login } = useContext(Context)

    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [isOtpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleOtp = (e) => {
        setOtp(e.target.value);
    };

    const submitOtp = async (e) => {
        e.preventDefault();
        try {
            const sendOtp = await fetch("/verify-otp/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfTokens || ''
                    
                },
                body: JSON.stringify({ otp, "username": data.username })
            });
            const result = await sendOtp.json()
            if (sendOtp.ok) {
                sessionStorage.setItem("access",result.access)
                sessionStorage.setItem("username",data.username)
                login(result.access)
                // redirect user to dashboard
                navigate("/profile",{state:{username:data.username}});
            } else {
                const result = await sendOtp.json();
                setErr(result.error || "Invalid OTP");
            }
        } catch (error) {
            console.error("Network error", error);
            setErr("Network error, please try again later");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfTokens
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const result = await response.json();
                setErr("");
                setOtpSent(true);
                console.log(`Login successful. OTP sent to email:`, result);
            } else {
                const result = await response.json();
                setErr(result.error || "Wrong credentials");
            }
        } catch (error) {
            console.error("Network error", error);
            setErr("Network error, please try again later");
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login to MoneyMind</h1>
            {!isOtpSent ? (
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div className="otp-section">
                    <h2>Enter OTP</h2>
                    <form className="otp-form" onSubmit={submitOtp}>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleOtp}
                            placeholder="Enter OTP"
                            required
                        />
                        <button type="submit">Verify OTP</button>
                    </form>
                </div>
            )}
            {err && <div className="error-message">{err}</div>}
        </div>
    );
};

export default Login;
