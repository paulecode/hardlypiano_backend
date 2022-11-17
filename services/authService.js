const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserService = require("./userService")()

const createAuthService = () => {
    const AuthService = {}
    const secret = process.env.SECRET || "12345"

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

        const token = jwt.sign(payload, secret)
        return token
    }
    AuthService.verifyToken = (token) => {
        if (!token) throw new Error("Token not provided.")
        try {
            const payload = jwt.verify(token, secret)
            return payload
        } catch {
            throw new Error("Invalid token.")
        }
    }
    AuthService.attemptLogin = async (username, password) => {
        try {
            const user = await userService.findOne({ username })
            if (!user) throw new Error()

            const hash = user.password
            const valid = await AuthService.isPasswordCorrect(password, hash)
            if (!valid) throw new Error()

            const token = AuthService.generateToken({ _id: user.id })
            return token
        } catch (e) {
            throw new Error("Login failed. Invalid credentials.")
        }
    }
    AuthService.loginAndReturnToken = () => {}
    AuthService.validateLogin = () => {}

    return AuthService
}

module.exports = createAuthService
