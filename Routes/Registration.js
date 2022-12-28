const router = require('express').Router()
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt')

router.post("/register" ,  async(req,res)=>{
try{
    const {email , password} = req.body
    const IsUser = await User.findOne({email:email})
    if(IsUser){
        return res.status(400).send("User Already Exists with given Email")
    }else{
        bcrypt.hash(password , 10 , async function(err,hash){
            if(err){
                return res.status(400).json({
                    "message" : err.message
                })
            }else{
                const user = new User({
                    email:email,
                    password:hash
                })
                user.save().then(()=>{
                   res.status(200).send("User Created SuccessFully")
                }).catch((e)=>{
                   res.status(400).send(e.message)
                })
            }
        })

    }

}catch(e){
    return res.status(400).send(e.message)
}

})

module.exports = router;