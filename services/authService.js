const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createAuthService = () => {
    const AuthService = {}

    AuthService.hashPassword = () => {}
    AuthService.checkPassword = () => {}
    AuthService.generateToken = () => {}
    AuthService.validateToken = () => {}
    AuthService.loginAndReturnToken = () => {}
    AuthService.validateLogin = () => {}

    return AuthService
}

module.exports = createAuthService
