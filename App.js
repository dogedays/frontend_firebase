import './App.css';
import React, {useState,useEffect,useContext,createContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import Table from './Table';
import NavBar from './navbar';
import HomePage from './Home';
import ShowAccounts from './showAccounts';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ShowAll from './showAll';
import TestState from './testState';
import { UserContexts,UserContextProvider } from './UserContext';
import RequireAuth from './RequireAuth';
import ShowFigures from './showFigures';
import ShowReports from './showReports';
function App() {
  

  // useEffect(()=>{
  //   console.log('hello');
  //   console.log(user);  
  // },[user]);


  // console.log(localStorage.getItem("user"));

  const {user,setUser} = useContext(UserContexts);
  console.log('in app: user ' + user);
  return (
    <div className="App"> 

    <Routes>
      <Route path = '/' element = {<HomePage />} ></Route>
      <Route path = '/home' element = {<HomePage />} ></Route>
      {/* Protected routes */}
      <Route element = {<RequireAuth/>}>
      <Route path = '/showAccounts' element = {ShowAccounts('/api/accounts')}></Route> 
      <Route path= '/showAll' element = {<ShowAll></ShowAll> }></Route>
      <Route path = '/test' element = {<TestState/>}></Route>
      <Route path = '/figures' element = {<ShowFigures></ShowFigures>}></Route>
      <Route path ='reports' element = {<ShowReports></ShowReports>}></Route>
        
      </Route>
    </Routes>

    </div>

  );
}


export default App;

// TODO: Make tables for accounts/players/leagues endpoints