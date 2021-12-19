const mongoose = require('mongoose');
const validator = require('validator');
const taskSchema = require('../schema/taskSchema');


const taskModel = mongoose.model("task", taskSchema);


module.exports = taskModel;