const mongoose = require("mongoose");

const userTable = new mongoose.Schema({
    name : String,
    email : {
        type:String,
        unique:true,
        required : true
    },
    password : String,
    profileimage : String,
    role : String,
},{
    timestamps : true
});

const userModel = mongoose.model("users",userTable);

module.exports = userModel;