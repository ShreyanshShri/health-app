const express=require('express')
const router= express.Router()

const Answer = require('../models/Answer')
const QnA = require('../models/QnA')
const User = require('../models/User')
const Consultant = require('../models/Consultant')
const authUser = require('../utils/authUser')

router.get('/', async (req, res) => {
    try {
        const qnaS = await QnA.find().sort({postedAt: 'desc'})
        res.status(200).json({qnaS})
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const qna = await QnA.findById(req.params.id).populate('answers')
        res.status(200).json({qna})
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})

router.post('/q', authUser, async (req, res) => {
    try {
        
        const user = await User.findOne({authKey: req.body.password})
        let qna = new QnA({
            username: user.username,
            email: user.email,
            profile: user.profile_pic,
            content: req.body.content
        })

        await qna.save()
        res.status(200).json({
            qna: qna,
            message: 'Question Posted'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})

router.put('/q/:id', authUser, async (req, res) => {
    try {
        
        let qna = await QnA.findById(req.params.id)

        if(qna.email != req.email) return res.status(400).json({message: "You cannot modify this file"})

        qna.content = req.body.content
        await qna.save()
        res.status(200).json({
            qna,
            message: "QnA Updated"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})


router.delete('/q/:id', authUser, async (req, res) => {
    try {
        
        let qna = await QnA.findById(req.params.id)

        if(qna.email != req.email) return res.status(400).json({message: "You cannot modify this file"})

        await qna.delete()
        
        res.status(200).json({
            qna,
            message: "QnA Deleted"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})


router.get('/a/all/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) {
            user = await Consultant.findById(req.params.id)
        }

        const answers = await Answer.find({email: user.email}).sort({createdAt: 'desc'})
        res.status(200).json({answers})
    } catch (err) {
        console.log(err.message)
        res.status(500).json({"message": "A server side error occured"})
    }
})

router.post('/a/:id', authUser, async (req, res) => {
    try {
        
        const ans = new Answer({
            username: req.user.username,
            email: req.user.email,
            profile: req.user.profile_pic,
            answer: req.body.answer,
            qna: req.params.id
        })

        await ans.save()

        let qna = await QnA.findById(req.params.id)
        qna.answers.push(ans._id)
        await qna.save()

        res.status(200).json({message: "Answer Posted", ans})

    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})


router.put('/a/:id', authUser, async (req, res) => {
    try {
        let answer = await Answer.findById(req.params.id)
        console.log(answer)
        if(answer.email != req.email) return res.status(400).json({message: "You cannot modify this file"})

        answer.answer = req.body.answer
        await answer.save()

        res.status(200).json({
            message: "Answer Updated",
            answer
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})

router.delete('/a/:id', authUser, async(req, res) => {
    try {
        
        let answer = await Answer.findById(req.params.id)

        if(answer.email != req.email) return res.status(400).json({message: "You cannot modify this file"})

        await answer.delete()
        
        res.status(200).json({
            answer,
            message: "Answer Deleted"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})

module.exports = router