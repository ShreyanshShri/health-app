const mongoose = require('mongoose')

const consultantSchema =new mongoose.Schema({
    username: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    authKey: {
        type: String,
        requred: true
    },
    profile_pic: {
        type: String,
    },
    about: {
        type: String,
    },
    joined: {
        type : Date,
        default : Date.now
    }
})


module.exports = mongoose.model("Consultant", consultantSchema)