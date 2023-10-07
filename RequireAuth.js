import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import {useLocation,Navigate,Outlet} from 'react-router-dom';
import { UserContexts,UserContextProvider } from './UserContext';
import { onAuthStateChanged } from 'firebase/auth';
import useAuth from './hooks/useAuth';

const RequireAuth = () => {
    const {user,setUser} = useContext(UserContexts);    
    
    return(
        user ? <Outlet/> : <Navigate to="/home"/> 
      )
}
export default RequireAuth;