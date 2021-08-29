require('dotenv').config()
const socketio = require('socket.io')
const express = require('express')
const app = express()

const connectToDb = require('./utils/connectToDb')
connectToDb()


const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
const io = socketio(server)

app.set("io", io)

const articleRoute = require('./routes/articles')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const consultantRoute = require('./routes/consultant')
const consultanceRoute = require('./routes/consultance')

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Working bae")
})

app.use('/auth', authRoute)
app.use('/articles', articleRoute)
app.use('/user', userRoute)
app.use("/consultant", consultantRoute)
app.use("/consultance", consultanceRoute)