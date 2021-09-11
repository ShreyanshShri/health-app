const express=require('express')
const router= express.Router()

const authUser = require('../utils/authUser')
const User = require('../models/User')

function scheduleReset() {
    // get current time
    let reset = new Date();
    // update the Hours, mins, secs to the 24th hour (which is when the next day starts)
    reset.setHours(24, 0, 0, 0);
    // calc amount of time until restart
    let t = reset.getTime() - Date.now();
    setTimeout(async function() {
        // reset variable
        await User.updateMany({}, {
            footsteps: 0
        })
        // schedule the next variable reset
        scheduleReset();
    }, t)
}

scheduleReset()

router.post('/get', authUser, (req, res) => {
    res.status(200).json({count: req.user.footsteps || 0})
})

router.post('/add', authUser, async(req, res) => {
    try {
        let user = await User.findById(req.user.id)
        user.footsteps = user.footsteps || 0
        user.footsteps += req.body.count
        await user.save()
        res.status(200).json({
            message: "Updated",
            count: user.footsteps
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'A server side error occured!'})
    }
})

module.exports = router