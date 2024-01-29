import React, { useState } from "react"
import {Link} from 'react-router-dom'
import M from 'materialize-css'
import '../../App.css'
const SignUp=()=>{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const postData = () => {
        fetch("/signUp",{
            method:'post',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({name:name,password:password,email:email})
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html: data.error, classes: 'square'});
            }
        })
    }

    return (
        <div className="login">
            <div className="auth-card card">
                <h2 className="brand-logo">CoPeople</h2>
                <input 
                type='text' 
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
                <input type='text' placeholder="Email" value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type='text' placeholder="Password" value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <button className='btn waves-effect waves-light #64b5f6 blue darken-1' onClick={()=>postData()}>Sign Up</button>
                <h5><Link to="/login"> Already have an account?</Link></h5>
            </div>
       </div>
    )
}

export default SignUp