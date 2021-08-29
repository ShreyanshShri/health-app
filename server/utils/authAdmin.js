const authAdmin = (req, res, next) => {

    const password = req.body.password

    if(password !== process.env.AUTH_TOKEN) {
        return res.status(400).json({
            message: "Invalid Auth Token... Try logging in again",
        })
        
    }

    next()
}

module.exports = authAdmin