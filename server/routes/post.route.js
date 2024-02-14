
const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const Post = mongoose.model('Post')
const requiredLogin = require('../middlewares/requiredLogin')

router.get('/allposts',requiredLogin,(req,res)=>{
    Post.find({}).populate('postedBy','_id name').then(result=> res.json(result)).catch(err=> console.log(err))
})

router.get('/mypost',requiredLogin,async (req,res)=>{
    let data = await Post.find({postedBy:req.user._id}).populate('postedBy')
    return res.json(data)
})

router.post('/createPost',requiredLogin,(req,res)=>{
      const {title,body, pic} = req.body
      if(!title || !body || !pic){
        res.status(402).json({error:"please fill all fields"})
      }
      Post.create({title:title,body:body,photo:pic,postedBy:req.user}).then(result=> res.json({post:result})).catch(err=>console.log(err))

})

router.put('/like',requiredLogin,(req,res)=>{
      Post.findByIdAndUpdate(req.body.postId,{$push:{likes:req.user._id}},{new:true}).then((result,err)=>{
        if(res){
          return res.json(result)
        } else {
          res.status(422).json(err)
        }
      })
})

router.put('/unlike',requiredLogin,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{$pull:{likes:req.user._id}},{new:true}).then((result,err)=>{
    if(result){
      return res.json(result)
    } else {
      res.status(422).json(err)
    }
  })
})

router.put('/comment',requiredLogin,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{$push:{comments:{text:req.body.comment,postedBy:req.user._id}}})
})

module.exports = router