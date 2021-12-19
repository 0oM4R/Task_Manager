const mongoose = require('mongoose');
const validator = require('validator');
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

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;