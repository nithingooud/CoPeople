import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
const Navbar =()=>{
    return (
        <nav>
        <div className="nav-wrapper white">
          <a href="/" className="brand-logo left" style={{marginLeft:25}}>CoPeople</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signUp">signUp</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/createpost">Create Post</Link></li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar