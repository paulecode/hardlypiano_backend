const AuthService = require("../services/authService")()

const isAuthenticated = (req, res, next) => {
    const token = req.header("Auth-Token")
    if (!token) return res.status(401).send("Access denied. No token provided.")

    try {
        const verified = AuthService.verifyToken(token)
        req.user = verified
        next()
    } catch (e) {
        res.status(400).send("Access denied. Invalid token.")
    }
}

module.exports = isAuthenticated
