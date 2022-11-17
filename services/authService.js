const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const owasp = require("owasp-password-strength-test")

const createAuthService = () => {
    const AuthService = {}
    const secret = process.env.TOKEN_SECRET || "12345"
    const tokenExpiration = process.env.NODE_ENV === "test" ? "5s" : "15m"

    AuthService.checkPasswordStrength = (password) => {
        if (!password) throw new Error("Password not provided")
        if (typeof password !== "string")
            throw new Error("Password must be string")

        const result = owasp.test(password)

        return result
    }

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

        const token = jwt.sign(payload, secret, { expiresIn: tokenExpiration })
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

    AuthService.attemptLogin = async (user, password) => {
        try {
            const hash = user.password
            const valid = await AuthService.isPasswordCorrect(password, hash)
            if (!valid) throw new Error("2")

            const token = AuthService.generateToken({ _id: user.id })
            return token
        } catch (e) {
            throw new Error("Login failed. Invalid credentials.")
        }
    }

    return AuthService
}

module.exports = createAuthService
