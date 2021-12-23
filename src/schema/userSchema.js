const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    email:{
        type: String,
        unique: true,
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
    },
    tokens:[
      {
        type: String,
        required: true 
      }
    ]

})
userSchema.virtual('tasks',{
  ref : 'task',
  localField:'_id',
  foreignField:'owner'
})

userSchema.methods.toJSON = function(){
  const user = this 
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject;
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });

userSchema.statics.findByCredentials = async function(email, password) {
   const user = await this.findOne({ email });

    if(!user) {
      throw new Error("Unable to login please check your email or password");
     

    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error("Unable to login please check your email or password");
    }
    return user;
  };


userSchema.methods.creatToken = async function(userID,secretKey){
  
   const token =  jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET);
  this.tokens=  this.tokens.concat(token);
  await this.save();
  return token ;
  }

  
 

   module.exports =userSchema;