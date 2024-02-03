import React,{useContext, useState,useEffect} from 'react'
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../App'
import M from 'materialize-css'; // Import Materialize JS

const Navbar =()=>{
    const {state,dispatch} = useContext(UserContext)
    const [showLogoutModal,setShowLogoutModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      const options = {
        onCloseEnd: () => setShowLogoutModal(false),
      };
      const modalElement = document.getElementById('logoutModal');
      if (modalElement) {
        const modal = M.Modal.init(modalElement, options);
        if (showLogoutModal) {
          modal.open();
        }
      }
    }, [showLogoutModal]);

    const renderList = () => {
      if(state){
        return [
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/createpost">Create Post</Link></li>,
          <li>
           <button data-target="modal1" className='btn waves-effect waves-light #64b5f6 red darken-1' onClick={()=>{
           setShowLogoutModal(true)
           }
          }>Log Out</button>
      

          </li> 

        ]
      } else {
        return [
          <li><Link to="/login">Login</Link></li>,
          <li><Link to="/signUp">signUp</Link></li>
        ]
      }
    }

    const handleLogout = () => {
      localStorage.clear();
      dispatch({ type: "CLEAR" });
      navigate('/login')
      M.toast({ html: "Logged out successfully", classes: "#43a047 green darken-1" });
      setShowLogoutModal(false);
    };

    return (
      <div>
        <nav>
          <div className="nav-wrapper white">
            <Link to={state ? "/" : "/login"} className="brand-logo left" style={{marginLeft:25}}>CoPeople</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down" style={{marginRight:25}}>
              {renderList()}
            </ul>
          </div>
        </nav>
        
        <div id="logoutModal" className="modal">
          <div className="modal-content">
            <h4>Logout</h4>
            <p>Are you sure you want to logout?</p>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat">Cancel</button>
            <button className="waves-effect waves-green btn-flat" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    )
}

export default Navbar