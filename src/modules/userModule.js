const mongoose = require('mongoose');

const userSchema = require('../schema/userSchema');


const userModel = mongoose.model("user", userSchema);


module.exports = userModel; 