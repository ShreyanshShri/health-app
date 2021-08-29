const mongoose = require('mongoose')
const marked = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window)
const slugify = require('slugify')

const articleSchema =new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
    },
    wallpaper: {
        type: String,
    },
    content: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    createdAt: {
        type : Date,
        default : Date.now
    }, 
    comments: [{
        comment: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        postedAt: {
            type: Date,
            default: Date.now
        }
    }]
})

articleSchema.pre('validate', function (next) {
    if(this.markdown){
        this.content = dompurify.sanitize(marked(this.markdown))
    }
    console.log(this.markdown)

    this.slug = slugify(this.title)

    next()
})

module.exports = mongoose.model("Article", articleSchema)