const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
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
        default: 'test-avatar',
    },
    about: {
        type: String,
    },
    joined: {
        type : Date,
        default : Date.now
    }
})


module.exports = mongoose.model("User", userSchema)