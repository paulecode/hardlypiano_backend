const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
    const token = req.header("Auth-Token")
    if (!token) return res.status(401).send("Access denied. No token provided.")

    try {
        console.log(token)
        console.log(process.env.TOKEN_SECRET)
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (e) {
        res.status(400).send("Access denied. Invalid token.")
    }
}

module.exports = isAuthenticated
