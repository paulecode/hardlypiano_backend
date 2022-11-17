const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userService = require("../services/userService")()
const AuthService = require("../services/authService")()

async function register(req, res, next) {
    const { username, password } = req.body

    try {
        const hashed = await AuthService.hashPassword(hashed)
        const user = await userService.createUser({
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
        const token = await AuthService.attemptLogin(username, password)
        return res.header("Auth-Token", token).send({ id: user._id, token })
    } catch (e) {
        next(e)
    }

    // const user = await userService.findOne({ username })
    // if (!user) {
    //     const err = new Error("Username not found.")
    //     err.statusCode = 409
    //     next(err)
    //     return
    // }

    // try {
    //     const token = await AuthService.attemptLogin(user, password)
    //     return res.header("Auth-Token", token).send({ id: user._id, token })
    // }

    // const isValid = await AuthService.isPasswordCorrect(password, user.password)
    // if (!isValid) {
    //     const err = new Error("Invalid password.")
    //     err.statusCode = 400
    //     return next(err)
    // }

    // const token = AuthService.generateToken({ _id: user.id })
}

async function changePassword(req, res, next) {
    const { username, password, newPassword } = req.body
    if (!username || !password || !newPassword) {
        const err = new Error("Bad request. Missing fields.")
        res.statusCode = 400
        next(err)
        return
    }

    const user = await userService.findOne({ username })
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
    // await userService.updateProperty(user)
    //what do i return here?
    return res.status(200).send("Password changed successfully.")
}

module.exports = { register, login, changePassword }
