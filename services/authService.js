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
    AuthService.checkPassword = () => {}
    AuthService.generateToken = () => {}
    AuthService.validateToken = () => {}
    AuthService.loginAndReturnToken = () => {}
    AuthService.validateLogin = () => {}

    return AuthService
}

module.exports = createAuthService
