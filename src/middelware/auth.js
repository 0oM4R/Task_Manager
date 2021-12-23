const jwt = require('jsonwebtoken')
const userModel= require('../model/userModel')
const auth =async (req, res,next) => {
    try {
        const token = req.header('Authorization').replace("Barrer ",'');
        const decode= jwt.verify(token,process.env.JWT_SECRET)
        const user= await userModel.findOne({_id:decode._id,tokens:token});
      
        if(!user){
            throw new Error('Invalid user please log in')
        }
        req.user = user;
        req.token= token;
        next();
    }catch (err){
        res.status(401).send({message:"please authenticate "})
    }

    
}
module.exports =auth; 