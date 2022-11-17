const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const UserModel = require("../models/User.js")

const getUsers = (User) => () => {
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

const testMethod = (User) => () => {
    return User.sayHi()
}

const validateUsername = (username) => {
    if (username.length < 3)
        throw new Error("Username must be at least 3 characters long.")

    if (username.length > 16)
        throw new Error("Username can't be longer than 16 characters.")

    if (username.includes(" "))
        throw new Error("Username can't contain whitespace.")

    const alphanumRegex = /^[A-Za-z0-9]+$/
    if (!alphanumRegex.test(username))
        throw new Error("Username cannot contain special characters.")

    return
}

const createUser =
    (User) =>
    async ({ username, password }) => {
        if (!username || !password) {
            const error = new Error("Username or password not provided.")
            error.statusCode = 400
            throw error
        }

        username = username.toLowerCase()

        if (await User.findOne({ username })) {
            const error = new Error("Username already in use.")
            error.statusCode = 403
            throw error
        }
        try {
            validateUsername(username)
        } catch (e) {
            e.statusCode = 400
            throw e
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const user = new User({ username, password: hashed })
        return await user.save()
    }

const deleteUserById = (User) => async (userId) => {
    const user = await User.findById(userId)
    return await user.remove()
}

const deleteAll = (User) => async (username, password) => {
    return await User.deleteMany({})
}

const updateProperty = (User) => async (user) => {
    const foundUser = await getUserById(User)(user._id)
    console.log(foundUser.password == user.password)
    console.log({ ...user })
    foundUser.set({ ...user })
    console.log(foundUser, user)
    return await foundUser.save()
}

module.exports = (User = UserModel) => {
    return {
        getUserById: getUserById(User),
        getUsers: getUsers(User),
        createUser: createUser(User),
        deleteAll: deleteAll(User),
        deleteUserById: deleteUserById(User),
        find: find(User),
        findOne: findOne(User),
        addPiece: addPiece(User),
        testMethod: testMethod(User),
        updateProperty: updateProperty(User),
    }
}
