const mongoose = require('mongoose')
const User = require("../models/User")

const authAdmin = async (req, res, next) => {

    const password = req.body.password

    try {
        const user = await User.findOne({ authKey: password })
        
        if(!user) {
            return res.status(400).json({
                message: "Invalid Auth Token... Try logging in again",
            })
        }

        req.username = user.username
        req.email = user.email
        req.user = user
        next()

    } catch (err) {
        res.status(500).json({
            message: "A server side error occured!"
        })
    }
}

module.exports = authAdmin