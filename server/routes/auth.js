const express=require('express')
const router= express.Router()
const crypto = require('crypto')

const PASSWORD = process.env.AUTH_PASSWORD

router.post('/', (req, res) => {
    const password = req.body.password

    if(password !== PASSWORD) {
        return res.status(400).json({message: 'Invalid Password'})
    }

    process.env.AUTH_TOKEN = crypto.randomBytes(64).toString('hex')
    
    res.status(200).json
        ({
            message: "You're Logged in",
            authToken: process.env.AUTH_TOKEN
        })

})

router.post('/verify', (req, res) => {
    if(req.body.authToken == process.env.AUTH_TOKEN) {
        return res.status(200).json({message: 'Token Verified'})
    }
    res.status(400).json({message: 'Token Invalid or expired'})
})

module.exports = router