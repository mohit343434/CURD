const mongoose = require("mongoose");

const userSchma = mongoose.Schema({
    userName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    city:{
        type:String,
    },
    age:{
        type:Number,
    },

},{timestamps: true});

const User = mongoose.model('User',userSchma);

module.exports = User