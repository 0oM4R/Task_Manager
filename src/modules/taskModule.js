const mongoose = require('mongoose');

const taskSchema = require('../schema/taskSchema');


const taskModel = mongoose.model("task", taskSchema);


module.exports = taskModel;