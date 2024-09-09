import React, { useState } from "react";
import "./Login.css";

const Login = () => {
    const [err,setErr] = useState("");
    const [data,setData] = useState({
        username:"",
        password:""
    })

    const handleChange = (e) =>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch("/user/login",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify(data)
            })
            if (response.ok){
                const result = await response.json() //get json from django
                setErr("");
                console.log(`welcome your are our most welcomed `,result)
            }
            else{
                setErr(result.errors.email || result.errors.password || "other Error")
                console.error("error loggin in");
                // console.error(`${result.errors.email || result.errors.password || "hahah"}`)
            }
        } catch (error) {
            console.error("network err",error)
            setErr("network err try later")
        }
        setData({
            username:"",
            password:""
        })
    }
    return (
        <div className="login-container">
            <h1 className="login-title">Login to MoneyMind</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="text"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    placeholder="username" required 
                />
                <input type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Password" required 
                />
                <button type="submit">Login</button>
            </form>
            {err && <>{err}</>}
        </div>
    );
};

export default Login;