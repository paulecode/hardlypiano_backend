const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const UserModel = require("../models/User.js")

const getUsers = (User) => () => {
    console.log("userService.getUsers called")
    return User.find({})
}

const getUserById = (User) => async (userId) => {
    if (!userId) throw new Error("No userId provided.")
    return await User.findById(userId)
}

const find = (User) => async (filters) => {
    return await User.find(filters)
}

const findOne = (User) => async (filters) => {
    return await User.findOne(filters)
}

const addPiece = (User) => async (userId, piece) => {
    const user = await User.findById(userId)
    user.pieces.push(piece)
    return await user.save()
}

const createUser = (User) => async ({ username, password }) => {
    if (!username || !password) {
        throw new Error("Username or password not provided.")
        return
    }
    if (await User.findOne({ username })) {
        throw new Error("Username already in use.")
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const user = new User({ username, password: hashed })
    return await user.save()
}

const deleteAll = (User) => (username, password) => {
    return User.deleteMany({})
}

module.exports = (User = UserModel) => {
    return {
        getUserById: getUserById(User),
        getUsers: getUsers(User),
        createUser: createUser(User),
        deleteAll: deleteAll(User),
        find: find(User),
        findOne: findOne(User),
        addPiece: addPiece(User),
    }
}
