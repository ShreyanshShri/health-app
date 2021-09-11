const mongoose = require('mongoose')
const User = require("../models/User")
const Consultant = require('../models/Consultant')

const authAdmin = async (req, res, next) => {

    const password = req.body.password
    try {
        const user = await User.findOne({ authKey: password })
        if (user) {
            req.username = user.username
            req.email = user.email
            req.user = user
        }
        let consultant;
        if (!user) {
            consultant = await Consultant.findOne({ authKey: password })
            req.username = consultant.username
            req.email = consultant.email
            req.user = consultant
            if(!consultant) {
                return res.status(400).json({
                    message: "Invalid Auth Token... Try logging in again",
                })
            }
        }
        next()

    } catch (err) {
        res.status(500).json({
            message: "A server side error occured!"
        })
    }
}

module.exports = authAdmin