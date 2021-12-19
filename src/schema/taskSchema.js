const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
     
        lowercase:true,
        validate(value){
          if(!valdator.isEmail(value)){
              throw new Error("Invalid email")
          } 
        }
    },
    password:{
        type: String,
        required: true
    },
   
   complete: {
        type: Boolean,
        defult:false
    }

})


taskSchema.pre('save',async function(next){
 if(this.isModified("password")){
  this.password =await bcrypt.hash(this.password,8)
 }
   next();
})
module.exports = taskSchema;
  