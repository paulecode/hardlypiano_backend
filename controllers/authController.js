const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const UserService = require("../services/userService")()
const AuthService = require("../services/authService")()

async function register(req, res, next) {
    const { username, password } = req.body

    try {
        if (process.env.NODE_ENV === "production") {
            const owaspTest = AuthService.checkPasswordStrength(password)
            if (!owaspTest.strong) {
                const { errors } = owaspTest
                console.log(errors)
                res.status(400).send({ errors })
                return
            }
        }
        const hashed = await AuthService.hashPassword(password)
        const user = await UserService.createUser({
            username,
            password: hashed,
        })
        res.status(200).send({
            data: {
                username,
                userId: user._id,
            },
        })
    } catch (e) {
        next(e)
    }
}

async function login(req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
        const err = new Error("Bad request. Missing fields.")
        err.statusCode = 400
        next(err)
        return
    }

    try {
        const user = await UserService.findOne({ username })
        const token = await AuthService.attemptLogin(user, password)
        return res
            .status(200)
            .header("Auth-Token", token)
            .send({ id: user._id, token })
    } catch (e) {
        const err = new Error("Login failed. Invalid credentials.")
        err.statusCode = 409
        next(e)
    }
}

async function changePassword(req, res, next) {
    const { username, password, newPassword } = req.body
    if (!username || !password || !newPassword) {
        const err = new Error("Bad request. Missing fields.")
        res.statusCode = 400
        next(err)
        return
    }

    const user = await UserService.findOne({ username })
    if (!user) {
        const err = new Error("Username not found.")
        err.statusCode = 409
        next(err)
        return
    }

    const isValid = await AuthService.isPasswordCorrect(password, user.password)
    if (!isValid) {
        const err = new Error("Invalid password.")
        err.statusCode = 400
        return next(err)
    }

    const hashed = await AuthService.hashPassword(newPassword)
    user.password = hashed
    await user.save()
    return res.status(200).send("Password changed successfully.")
}

module.exports = { register, login, changePassword }
