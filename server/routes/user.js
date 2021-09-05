const express=require('express')
const router= express.Router()
const crypto = require('crypto')
const bcrypt = require("bcrypt")
const path = require('path')
const multer = require('multer')

const authUser = require('../utils/authUser')
const User = require('../models/User')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '/../uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, generateRandomString().slice(0, 10))
    }
})

const upload = multer({ storage: storage })

router.post('/register', async(req, res) => {
    const {email, password} = req.body

    if (email === "" || email == null || password === "" || password == null || password.length < 6) {
        return res.status(400).json({
            message: "Please type your email and password properly, password must be 6 characters long"
        })
    }

    try {
        
        let user = new User(req.body)
        user.authKey = generateRandomString()
        user.password = await bcrypt.hash(password, 10)

        await user.save()
        res.status(200).json({
            message: "Account Created",
            authKey: user.authKey
        })

    } catch (err) {
        res.status(500).json({
            message: "A server side error occured!"
        })
        console.log(err)
    }
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body

    try {
        
        const user = await User.findOne({ email: email })

        if (!user) return res.status(400).json({message: "No user exists with that email"})

        if (await bcrypt.compare(password, user.password) === false) {
            return res.status(400).json({message: "Invalid Password"})
        }

        user.authKey = generateRandomString()
        await user.save()

        res.status(200).json({message: "Logged In", authKey: user.authKey})

    } catch (err) {
        res.status(500).json({
            message: "A server side error occured!"
        })
        console.log(err)
    }
})

router.post('/change-pfp', upload.single("avatar"), authUser, async(req, res) => {
    try {
        const user = await User.findOne({ authKey: req.body.password })
        console.log(req.file)
        user.profile_pic = req.file.filename
        await user.save()
        res.status(200).json({message: "Profile Updated"})
    } catch (err) {
        res.status(500).json({
            message: "A server side error occured!"
        })
        console.log(err)
    }
})

router.post('/update-desc', authUser, async (req, res) => {
    try {

        let user = await User.findOne({authKey: req.body.password})
        if(!user) return res.status(400).json({message: "No user found! Try loggin in agai"})
        
        user.about = req.body.desc
        await user.save()
        res.status(200).json({message: "Profile Updated", desc: req.body.desc})

    } catch (err) {
        res.status(500).json({
            message: "A server side error occured!"
        })
        console.log(err)
    }
})


const generateRandomString = () => {
    return crypto.randomBytes(64).toString('hex')
}

module.exports = router