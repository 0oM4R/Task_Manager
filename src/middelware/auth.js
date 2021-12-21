const jwt = require('jsonwebtoken')
const userModel= require('../modules/userModule')
const auth =async (req, res,next) => {
    try {
        const token = req.header('Authorization').replace("Barrer ",'');
        const decode= jwt.verify(token,'secretKey')
        const user= await userModel.findOne({_id:decode._id,token:token});
        req.user= user;
        next();
    }catch (err){
        res.status(401).send({message:"please authenticate "})
    }

    
}
module.exports =auth; 