require('dotenv').config()
const socketio = require('socket.io')
const express = require('express')
const app = express()
const moment = require('moment')

const connectToDb = require('./utils/connectToDb')
connectToDb()

const User = require('./models/User')
const Consultant = require('./models/Consultant')
const Chats = require('./models/Chats')


const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
const io = socketio(server)


const articleRoute = require('./routes/articles')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const consultantRoute = require('./routes/consultant')
const consultanceRoute = require('./routes/consultance')
const qnaRoute = require('./routes/qna')

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/routes/views/index.html')
})



// socketio stuff
    io.on('connection', socket => {
        console.log("connected")

        let chatId = null;

        socket.on('join-user', async({sender_authKey, reciever_email}) => {

            const sender = await User.findOne({ authKey: sender_authKey })
            const reciever = await Consultant.findOne({ email: reciever_email })
            
            if (!sender) console.log(sender)
            if (!reciever) return console.log(reciever)

            const case1 = await Chats.findOne({
                client: sender.email,
                consultant: reciever.email
            })
            const case2 = await Chats.findOne({
                client: reciever.email,
                consultant: sender.email
            })

            let currChat;

            if (case1) {
                chatId = case1.id
                currChat = case1
            } else if(case2) {
                chatId = case2.id
                currChat = case2
            }

            if (chatId == null) {
                try {
                    const chat = new Chats({
                        client: sender.email,
                        consultant: reciever.email
                    })
                    await chat.save()

                    const temp = await Chats.findOne({ client: sender.email })
                    chatId = temp.id
                    socket.join(temp.id)
                    console.log('joined')
                    
                    socket.to(temp.id).emit("message", {
                        text: "Hii",
                        sender: sender.username
                    })
                    socket.emit('user-joined')
                } catch (err) {
                    console.log(err)
                }
            } else {
                console.log('join user')
                let chat = await Chats.findById(chatId)
                socket.join(chat.id)
                socket.emit('message', {msgs: chat.chats})
                socket.emit('user-joined')
            }

        })

        socket.on('send-message', async({text, sender}) => {
            console.log('send msg')
            const time = moment().format('h:mm a')
            socket.to(chatId).emit('message', {text, sender, time})

            try {
                let chat = await Chats.findById(chatId)
                let prevChats = chat.chats
                chat.chats = [...prevChats, {
                    text, sender, time
                }]
                await chat.save()
            } catch (err) {
                console.log(err)
            }
        })

        socket.on('disconnect', () => {
            console.log("disconnected")
            chatId = null;
        })
    })








app.use('/uploads', express.static('uploads'))
app.use('/auth', authRoute)
app.use('/articles', articleRoute)
app.use('/user', userRoute)
app.use("/consultant", consultantRoute)
app.use("/consultance", consultanceRoute)
app.use('/qna', qnaRoute)