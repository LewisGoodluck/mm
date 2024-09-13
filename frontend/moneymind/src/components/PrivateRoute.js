import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/context";

const PrivateRoute = ({element}) =>{
    // check access
    const {logged} = useContext(Context)

    return logged ? element : (<Navigate to="/login" />)

   
}

export default PrivateRoute