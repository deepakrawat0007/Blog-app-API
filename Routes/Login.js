const User = require('../Models/UserModel');
const bcrypt = require('bcrypt')
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = "HelloUser"


router.post('/login' , async(req,res)=>{
    try{
        const {email , password} = req.body
        const Isuser = await User.findOne({email:email})

        if(!Isuser){
            return res.status(400).send("No User Exists With given Email")
        }else{
            bcrypt.compare(password , Isuser.password, function(err,result){
                if(err){
                    return res.status(400).json({
                        "message":err.message
                    })
                }

                if(result){
                const token = jwt.sign({
                        exp:Math.floor(Date.now() / 1000)+(60*60),
                        data:Isuser._id
                    },secret);
                    return res.status(200).json({
                        "Message":"Logged In Success",
                        "token":token
                    })
                }else{
                    return res.status(400).send("Invalid-Credentials")
                }
            })

        }

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }

})
router.get("/" ,(req,res)=>{
    res.json({
        "Message":"404 not found"
    })
})

module.exports = router