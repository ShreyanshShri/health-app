const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const moment = require('moment')
const Chats = require('../models/Chats')
const User = require('../models/User')
const Consultant = require('../models/Consultant')
const path = require('path')
const { isError } = require('util')

router.get('/', (req, res) => {
    
    let io = req.app.get("io")

    io.on('connection', (socket) => {
            console.log('connected')
        socket.on('disconnect', () => {
            console.log('disconnected')
            socket.removeAllListeners()
        })
    })
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
})

module.exports = router







    // io.on('connection', socket => {
    //     console.log("connected")

    //     let chatId = null;

    //     socket.on('join-user', async({sender_authKey, reciever_email}) => {

    //         const sender = await User.findOne({ authKey: sender_authKey })
    //         const reciever = await Consultant.findOne({ email: reciever_email })
            
    //         if (!sender) console.log(sender)
    //         if (!reciever) return console.log(reciever)

    //         const case1 = await Chats.findOne({
    //             client: sender.email,
    //             consultant: reciever.email
    //         })
    //         const case2 = await Chats.findOne({
    //             client: reciever.email,
    //             consultant: sender.email
    //         })

    //         let currChat;

    //         if (case1) {
    //             chatId = case1.id
    //             currChat = case1
    //         } else if(case2) {
    //             chatId = case2.id
    //             currChat = case2
    //         }

    //         if (chatId == null) {
    //             try {
    //                 const chat = new Chats({
    //                     client: sender.email,
    //                     consultant: reciever.email
    //                 })
    //                 await chat.save()

    //                 const temp = await Chats.findOne({ client: sender.email })
    //                 chatId = temp.id
    //                 socket.join(temp.id)
    //                 console.log('joined')
                    
    //                 socket.to(temp.id).emit("message", {
    //                     text: "Hii",
    //                     sender: sender.username
    //                 })
    //                 socket.emit('user-joined')
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         } else {
    //             console.log('join user')
    //             let chat = await Chats.findById(chatId)
    //             socket.join(chat.id)
    //             socket.emit('message', {msgs: chat.chats})
    //             socket.emit('user-joined')
    //         }

    //     })

    //     socket.on('send-message', async({text, sender}) => {
    //         console.log('send msg')
    //         const time = moment().format('h:mm a')
    //         socket.to(chatId).emit('message', {text, sender, time})

    //         try {
    //             let chat = await Chats.findById(chatId)
    //             let prevChats = chat.chats
    //             chat.chats = [...prevChats, {
    //                 text, sender, time
    //             }]
    //             await chat.save()
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     })

    //     socket.on('disconnect', () => {
    //         console.log("disconnected")
    //         chatId = null;
    //     })
    // })



