import React from "react";
import Navbar from "./components/Navbar";
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import SignUp from './components/screens/SignUp'
import LogIn from './components/screens/Login'
import CreatePost from './components/screens/CreatePost'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/createpost' element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
