import React, { createContext, useEffect, useState } from "react";

export const Context = createContext()



export const ContextProvider = ({ children }) =>{
    const [logged,setLogin] = useState(sessionStorage.getItem("access"))
    const [username,setUsername] = useState(sessionStorage.getItem("username")|| "")

    useEffect(()=>{
        const access = sessionStorage.getItem("access")
        const username = sessionStorage.getItem("username")
        if(access){
            setLogin(true)
            setUsername(username)
        }
    },[])

    const login = (access) => {
        sessionStorage.setItem("access",access)
        sessionStorage.setItem("username",access)
        setLogin(true)
    }
    const logout = () =>{
            sessionStorage.removeItem("access")
            sessionStorage.removeItem("username")
            setLogin(false)
        }
        
    return (
        <Context.Provider value={{ logged,login,logout, username }}>
            {children}
        </Context.Provider>
    )
}