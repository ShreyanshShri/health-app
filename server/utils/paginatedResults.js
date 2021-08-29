const mongoose = require('mongoose')

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = 10

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        
        const length = await model.countDocuments().exec()

        

        if(length % 10 == 0) {
            results.pages = length / 10
        } else {
            results.pages = (length / 10) + 1
        }

        if (endIndex < length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
        }
        
        if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
        }
        try {
            const modelName = new model().constructor.modelName.toLowerCase()
            results[modelName] = await model.find().limit(limit).skip(startIndex).select(['_id', 'title', 'description', 'wallpaper', 'slug', 'name', 'email', 'phoneNo', 'message', 'createdAt', 'hasContacted']).sort({ createdAt : "desc" }).exec()
            res.paginatedResults = results
            next()
        } catch (e) {
        res.status(500).json({ message: e.message })
        }
    }
}

module.exports = paginatedResults