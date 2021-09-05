const express=require('express')
const router= express.Router()

const authAdmin = require('../utils/authAdmin.js')
const authUser = require('../utils/authUser')
const paginatedResults = require('../utils/paginatedResults')
const Article = require('../models/Article')
const Comment = require('../models/Comment')
const User = require('../models/User')

router.get('/', paginatedResults(Article), (req, res) => {
    res.status(200).json(res.paginatedResults)
})

router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        res.status(200).json(article)
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "A server side error occured"})
    }
})

router.post('/', authAdmin, async (req, res) => {

    const {title, description, wallpaper, markdown} = req.body.article
    const article = new Article({
        title,
        description,
        wallpaper,
        markdown
    })
    try {
        await article.save()
        res.status(200).send({"message": "Article Uploaded", id: article._id})
    } catch (err) {
        console.log(err)
        res.status(500).send({"message": "A server side error occured"})
    }
})

router.put('/:id', authAdmin, async (req, res) => {
    const {title, description, wallpaper, markdown} = req.body.article

    try {
        let article = await Article.findById(req.params.id)
        article.title = title
        article.description = description
        article.wallpaper = wallpaper
        article.markdown = markdown
        await article.save()
        res.status(200).json({"message": "Article Updated", "article": article})
    } catch (err) {
        res.status(500).json({"message": "A server side error occured."})
    }
})

router.delete('/:id', authAdmin, async (req, res) => {

    try {
        await Article.findByIdAndDelete(req.params.id)
        res.status(200).json({"message": "Article Deleted"})
    } catch (err) {
        res.status(500).json({"message": "A server side error occured."})
    }
})

// comment section
router.post('/comment/:id', authUser, async (req, res) => {
    try {

        const article = await Article.findById(req.params.id)
        if (!article) return res.status(400).json({message: "Article doesn't exist!"})
        const user = await User.findOne({authKey: req.body.password})
        const comment = new Comment({
            comment: req.body.comment,
            username: user.username,
            profile: user.profile_pic,
            email: user.email,
            article: article._id
        })
        console.log(comment)
        console.log(article)
        console.log(req.body.comment)
        await comment.save()
        article.comments.push(comment._id)
        await article.save()
        res.status(200).json({
            message: "Comment Posted",
            article: article
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({messsage: "A server side error occured!"})
    }
})

module.exports = router