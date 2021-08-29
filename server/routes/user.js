const express=require('express')
const router= express.Router()
const crypto = require('crypto')
const bcrypt = require("bcrypt")

const User = require('../models/User')

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



const generateRandomString = () => {
    return crypto.randomBytes(64).toString('hex')
}

module.exports = router