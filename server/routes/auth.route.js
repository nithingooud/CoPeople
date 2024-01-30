const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const User = mongoose.model('User')
const requiredLogin = require('../middlewares/requiredLogin')

//middleware to verify token
router.get('/protected',requiredLogin,(req,res)=>{
    res.send("hello user")
})

//User register
router.post('/signUp',async (req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
       return res.status(404).json({error:"please enter all fields"})
    }
    const savedUser = await User.findOne({email:email})
    if(savedUser){
        return res.json({error:"user already exists with this mail"})
    }
    bcrypt.hash(password,12).then(hashedpassword => User.create({name:name,email:email,password:hashedpassword}).then(user=>{
                                                           res.json({message:"created successfully"})
                                                    }).catch(err=> console.log(err)))
    .catch(err=> res.json({message:"error in hashing"}) )
})

//User Login
router.post('/signIn',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.json({message:"please fill all the required fields"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=> {
            if(doMatch){
                const token = jwt.sign({_id: savedUser._id},JWT_SECRET)
                const {_id,name,email} = savedUser
                res.json({token,user:{_id,name,email}})
            } else {
                res.json({message: "Invalid Password"})
            }
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

module.exports = router