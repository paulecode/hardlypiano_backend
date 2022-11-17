const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userService = require("../services/userService")()

async function register(req, res, next) {
    const { username, password } = req.body

    try {
        const user = await userService.createUser({ username, password })
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

    const user = await userService.findOne({ username })
    if (!user) {
        const err = new Error("Username not found.")
        err.statusCode = 409
        next(err)
        return
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        const err = new Error("Invalid password.")
        err.statusCode = 400
        next(err)
        return
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    return res.header("Auth-Token", token).send({ id: user._id, token })
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

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        const err = new Error("Invalid password.")
        err.statusCode = 400
        next(err)
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword
    //what do i return here?
    return res.status(200).send("Password changed successfully.")
}

module.exports = { register, login, changePassword }
