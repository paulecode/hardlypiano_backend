const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createAuthService = () => {
    const AuthService = {}

    AuthService.hashPassword = async (password) => {
        if (!password) throw new Error("Password not provided.")
        if (typeof password !== "string")
            throw new Error("Password must be a string")

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        return hashed
    }
    AuthService.isPasswordCorrect = async (password, hash) => {
        if (!password || !hash) throw new Error("Missing arguments")

        const isPasswordCorrect = await bcrypt.compare(password, hash)
        return isPasswordCorrect
    }
    AuthService.generateToken = (payload) => {
        if (!payload) throw new Error("Payload not provided")

        const secret = process.env.SECRET || "12345"
        const token = jwt.sign(payload, secret)
        return token
    }
    AuthService.validateToken = () => {}
    AuthService.loginAndReturnToken = () => {}
    AuthService.validateLogin = () => {}

    return AuthService
}

module.exports = createAuthService
