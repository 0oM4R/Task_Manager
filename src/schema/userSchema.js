const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    email:{
        type: String,
     
        lowercase:true,
        validate(value){
          if(!validator.isEmail(value)){
              throw new Error("Invalid email")
          } 
        }
    },
    password:{
        type: String,
        required: true
    }

})
userSchema.pre('save',async function(next){
    if(this.isModified("password")){
     this.password =await bcrypt.hash(this.password,8)
    }
      next();
   })
   module.exports =userSchema;