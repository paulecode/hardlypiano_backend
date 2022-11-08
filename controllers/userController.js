const userModel = require("../models/User")
const userService = require("../services/userService")(userModel)

async function getAll(req, res) {
    const result = await userService.getUsers()
    console.log(result)
    res.send(result)
}

async function deleteAllUsers(req, res) {
    const deleted = await userService.deleteAll()
    res.send(`deleted ${deleted.deletedCount} users`)
}

async function get(req, res) {
    const user = await userService.getUserById(req.user._id)
    return res.status(200).send(user)
}

module.exports = { get, getAll, deleteAllUsers }
