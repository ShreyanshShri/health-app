const mongoose = require('mongoose')

const chatsSchema =new mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    consultant: {
        type: String,
        required: true
    },
    chats: [{
        text: {
            type: String,
        },
        sender: {
            type: String,
            required: true
        },
        time: {
            type: String,
        }
    }]
})


module.exports = mongoose.model("Chats", chatsSchema)