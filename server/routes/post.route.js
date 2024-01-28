
const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const Post = mongoose.model('Post')
const requiredLogin = require('../middlewares/requiredLogin')

router.get('/allposts',(req,res)=>{
    Post.find({}).populate('postedBy','_id name').then(result=> res.json(result)).catch(err=> console.log(err))
})

router.get('/mypost',requiredLogin,async (req,res)=>{
    let data = await Post.find({postedBy:req.user._id})
    return res.json(data)
})

router.post('/createPost',requiredLogin,(req,res)=>{
      const {title,body} = req.body
      if(!title || !body){
        res.status(402).json({error:"please fill all the required fields"})
      }
      Post.create({title,body,postedBy:req.user}).then(result=> res.json({post:result})).catch(err=>console.log(err))

})

module.exports = router