const Post = require('../Models/PostModel')
const User = require("../Models/UserModel");
const cloudinary = require('../Cloudinary/cloudinary');
const router = require('express').Router()

router.get('/posts' , async(req,res)=>{
    try{
        const posts = await Post.find({user:req.user}) 
        res.status(200).json(posts)

    }catch(e){
        return res.status(400).send(e.message)
    }
})

router.post("/posts" , async(req,res)=>{
    try{
        const user = await User.findById(req.user)
         const {title, description ,author} = req.body
         const file = req.files.files.tempFilePath

         const image = await cloudinary.uploader.upload(file,{
            folder: "posts"
         })

      const post = new Post({
        image:image.secure_url,
        title:title,
        description:description,
        author:author,
        user:req.user
      })
        post.save()
           res.status(200).json({
                "message":"Post Created",
                "post":post
           })
     
    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
})

module.exports = router