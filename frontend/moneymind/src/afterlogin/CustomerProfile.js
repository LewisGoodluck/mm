import React, { useContext } from "react";
import { Context } from "../context/context";

const CustomerProfile = () =>{
    const {username} = useContext(Context)
    return(
        <>
            <div>Welcome {username}</div>
        </>
    )
}

export default CustomerProfile