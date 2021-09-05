const mongoose = require('mongoose')

const answerSchema =new mongoose.Schema({
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
    answer: {
        type: String,
        required: true,
    },
    createdAt: {
        type : Date,
        default : Date.now
    }, 
    qna: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QnA",
        required: true,
    }
})

module.exports = mongoose.model("Answer", answerSchema)