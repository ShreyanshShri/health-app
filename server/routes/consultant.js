const express=require('express')
const router= express.Router()
const crypto = require('crypto')
const bcrypt = require("bcrypt")

const Consultant = require('../models/Consultant')

router.post('/register', async(req, res) => {
    const {email, password} = req.body

    if (email === "" || email == null || password === "" || password == null || password.length < 6) {
        return res.status(400).json({
            message: "Please type your email and password properly, password must be 6 characters long"
        })
    }

    try {
        const test = await Consultant.findOne({email: email})
        if(test) return res.status(400).json({message: "Acocunt already exists with this email"})
        let consultant = new Consultant(req.body)
        consultant.authKey = generateRandomString()
        consultant.password = await bcrypt.hash(password, 10)
        consultant.profile_pic = 'test-avatar'
        consultant.about = 'hi im using health++'

        await consultant.save()
        res.status(200).json({
            message: "Account Created",
            authKey: consultant.authKey,
            id: consultant._id,
            username: consultant.username,
            email: consultant.email
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
        
        let consultant = await Consultant.findOne({ email: email })

        if (!consultant) return res.status(400).json({message: "No user exists with that email"})

        if (await bcrypt.compare(password, consultant.password) === false) {
            return res.status(400).json({message: "Invalid Password"})
        }

        consultant.authKey = generateRandomString()
        await consultant.save()

        res.status(200).json({message: "Logged In", authKey: consultant.authKey, id: consultant._id, username: consultant.username,
        email: consultant.email})

    } catch (err) {
        res.status(500).json({
            message: "A server side error occured!"
        })
        console.log(err)
    }
})

router.get('/', async (req,res ) => {
    try {
        const consultants = await Consultant.find().select(['username', 'email', 'joined', '_id', 'profile_pic', 'about']).exec()
        res.status(200).json({consultants})
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