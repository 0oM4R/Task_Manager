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
   complete: {
        type: Boolean,
        defult:false
    }

})



module.exports = taskSchema;
  