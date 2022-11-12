const isAuthenticated = (req, res, next) => {
    const jwt = require("jsonwebtoken")
    const token = req.header("Auth-Token")
    if (!token) return res.status(401).send("Access denied. No token provided.")

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        // console.log("RETURNING THIS", verified)
        req.user = verified
        next()
    } catch (e) {
        // console.log(e.message)
        res.status(400).send("Access denied. Invalid token.")
    }
}

module.exports = isAuthenticated
