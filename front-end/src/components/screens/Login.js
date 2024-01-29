import React, { useState } from "react"
import {Link} from 'react-router-dom'
import '../../App.css'

const LogIn= () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const login = () => {
        console.log(email,password)
         fetch('/signIn',{
            method:'post',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email:email,password:password})
         }).then(res=>res.json()).then(data=>console.log(data))
    }

    return (       
       <div className="login">
            <div className="auth-card card input-field">
                <h2 className="brand-logo">CoPeople</h2>
                <input type='text' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='text' placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className='btn waves-effect waves-light #64b5f6 blue darken-1' onClick={()=>login()}>LogIn</button>
                <h5><Link to="/signUp">Don't have an account?</Link></h5>
            </div>
       </div>
    )
}

export default LogIn