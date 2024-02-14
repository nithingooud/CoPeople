
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    photo:{type:String,required:true},
    postedBy:{type:mongoose.Types.ObjectId , ref:"User"},
    likes:[{type:mongoose.Types.ObjectId,ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:mongoose.Types.ObjectId,ref:"User"}
    }]
})

mongoose.model('Post',postSchema)
