import React from 'react'
import { Navigate } from 'react-router-dom';
import {useLocalState} from "../util/useLocalStorage"

const PrivateRoute = ((children) => {
    const[user,setUser] = useLocalState("", "user");
    return user? children: <Navigate to= '/home'/>;
})

