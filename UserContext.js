import { createContext, useState,useEffect } from "react";
import React from "react";
import { auth } from "./firebase-config";

import { onAuthStateChanged } from "firebase/auth";


// NEED A USER PROVIDER INSTEAD OF GLOBAL USE STATE

const UserContexts = createContext();

const UserContextProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const[pending,setPending] = useState(true);


    useEffect( ()=>{
        onAuthStateChanged(auth,(curr) =>{
          console.log(user);

          setUser(curr);          // THIS LINE MADE AUTH FINALLY PERSIST
          setPending(false);
        });
      },[]);

    if (pending){
        return <>Loading...</>
    }
    return (
        <UserContexts.Provider value = {{user,setUser}}>
            {children}
        </UserContexts.Provider>
    );
};

export {UserContexts,UserContextProvider};