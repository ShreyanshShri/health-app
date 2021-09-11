const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Chats = require('../models/Chats')
const authUser = require('../utils/authUser')

router.post('/', authUser, async (req, res) => {
    try {
        const chats = await Chats.find({$or: [{sender: req.email, reciever: req.email}]})
        return res.status(200).json({chats})
    } catch (err) {
        console.log(err)
        console.log("here")
        res.status(500).json({"message": "A server side error occured"})
    }
})

module.exports = router

