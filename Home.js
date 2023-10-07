import React from 'react'
import { useState, useEffect,useContext} from 'react';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    initializeAuth, browserLocalPersistence
  } from "firebase/auth";


import { auth } from "./firebase-config";
import { UserContexts } from './UserContext';

// Use context basically makes the variable global 


function HomePage(){
  
  
  // const auth = initializeAuth(app, {
  //   persistence: browserLocalPersistence
  // });

  const {user,setUser} = useContext(UserContexts);  

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  

  useEffect( () => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  }, []);


 
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

    return (
        <div className='home'>

        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>

      <h3> User Logged In: </h3>
      {user?user.email:'Not logged in '}

      <button onClick={logout}> Sign Out </button>
        </div>
    );
}


export default HomePage;