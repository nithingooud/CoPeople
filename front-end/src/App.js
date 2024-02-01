import React, { createContext, useEffect, useReducer,useContext } from "react";
import Navbar from "./components/Navbar";
import {BrowserRouter,Route,Routes,useNavigate } from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import SignUp from './components/screens/SignUp'
import LogIn from './components/screens/Login'
import CreatePost from './components/screens/CreatePost'
import {reducer, initialstate} from './reducers/userReducer.js'


export const UserContext = createContext()

const Routing = () => {
    const navigate = useNavigate()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("user"))
      if(user){
        navigate('/')
      } else {
        navigate('/login')
      }
    },[])
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/createpost' element={<CreatePost />} />
      </Routes>
    )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialstate)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
