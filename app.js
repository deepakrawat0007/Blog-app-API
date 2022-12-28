const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const LoginRoute = require("./Routes/Login");
const RegistrationRoute = require("./Routes/Registration")
const PostRoute = require("./Routes/Post")
const cors = require('cors')
const fileupload = require('express-fileupload');
const jwt = require('jsonwebtoken')
const secret = "HelloUser";

app.use(cors())


app.use(express.json());
app.use(bodyparser.json());
app.use(fileupload({
    useTempfiles :true
}))

app.use("/posts" , (req , res , next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization
        if(token){
            jwt.verify(token , secret, function(err,decoded){
                if(err){
                    return res.status(400).json({
                        "Message":err.message
                    })
                }
                    req.user = decoded.data
                    next()
                
            })
        }
        else{
            return res.status(400).json({
                "message":"Token is Missing"
            })
        }
    }else{
        return res.status(400).json({
            "Message":"Not Authenticated User"
        })
    }
})

app.use("/" , LoginRoute)
app.use("/" , RegistrationRoute)
app.use("/" , PostRoute)

app.get("/" , async(req,res)=>{
    res.status(200).json({
        "message":"server IS ok"
    })
})



module.exports = app;