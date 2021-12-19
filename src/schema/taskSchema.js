const mongoose = require('mongoose');
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

  this.password =await bcrypt.hash(this.password,8)

   next();
})
module.exports = taskSchema;
  