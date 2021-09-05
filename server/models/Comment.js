const mongoose = require("mongoose")

const comment_schema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email : {
        type: String,
        required : true
    },
    profile :{
        type : String,
        required : true
    },
    postedAt: {
        type : Date,
        default : Date.now
    },
    comment: {
        type: String,
        require: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
        require: true
    }
})

module.exports = mongoose.model("Comment", comment_schema);