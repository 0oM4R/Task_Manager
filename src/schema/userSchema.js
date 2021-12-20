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
  


   module.exports =userSchema;