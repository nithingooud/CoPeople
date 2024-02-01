import React,{useContext} from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import {UserContext} from '../App'
const Navbar =()=>{
    const {state,dispatch} = useContext(UserContext)
    const renderList = () => {
      console.log("state",state)
      if(state){
        return [
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/createpost">Create Post</Link></li>,
          <li><Link to='/login'>
           <button className='btn waves-effect waves-light #64b5f6 red darken-1' onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
           }}>Log Out</button></Link>
          </li> 

        ]
      } else {
        return [
          <li><Link to="/login">Login</Link></li>,
          <li><Link to="/signUp">signUp</Link></li>
        ]
      }
    }
    return (
        <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/login"} className="brand-logo left" style={{marginLeft:25}}>CoPeople</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down" style={{marginRight:25}}>
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default Navbar