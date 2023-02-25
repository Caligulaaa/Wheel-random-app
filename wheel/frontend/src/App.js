import './App.css';
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { AuthContext } from './utils/context';
import Navbar from './components/UI/navbar/Navbar';

import About from './pages/About';
import ChanceBox from './pages/ChanceBox';
import Login from './pages/Login';
import Register from './pages/Register';
import MyItems from './pages/MyItems';
import PrivateRoute from './utils/PrivateRoute'

function App() {

  const [isAuth, setIsAuth] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(()=> {
    if(localStorage.getItem('authToken')){
      setIsAuth(true)
      var decode = jwt_decode(localStorage.getItem('authToken'));
      setUsername(decode.username)
    }
  },[])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      setUsername,
      username,
    }}
    >


    <Router>
      <div className='' >
        <Navbar />
          <Routes>

            <Route path="/" element={<About />}></Route>
            <Route path="/combackbox/" element={<ChanceBox />}></Route>
            <Route path="/register/" element={<Register />}></Route>
            <Route path="/login/" element={<Login />}></Route>
            <Route path="/" element={<PrivateRoute />} >
              <Route path="/myitems" element={<MyItems />}></Route>
            </Route>
            

          </Routes>
      </div>
      
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
