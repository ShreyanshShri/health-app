const mongoose = require("mongoose")

const qna_schema = new mongoose.Schema({
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
    content: {
        type: String,
        require: true
    },
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer",
        }
    ]
})

module.exports = mongoose.model("QnA", qna_schema);