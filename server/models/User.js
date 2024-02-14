const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password: {type: String, required: true},
    followers: {type: Number,default: 0},
    following: {type: Number, default: 0},
    profileImage: {type: String}
})

mongoose.model('User',userSchema)