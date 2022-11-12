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
    if (!username || !password)
        return res.status(400).send("Bad request. Missing fields")

    const user = await userService.findOne({ username })
    if (!user) return res.status(409).send("Username not found.")

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send("Invalid password.")

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    return res.header("Auth-Token", token).send({ id: user._id, token })
}

module.exports = { register, login }
