const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const UserModel = require("../models/User.js")

const AuthService = require("./authService")()

const createUserService = (User = UserModel) => {
    const UserService = {}

    UserService.getUserById = async (userId) => {
        if (!userId) throw new Error("No userId provided.")
        return await User.findById(userId)
    }

    UserService.find = async (filters) => {
        return await User.find(filters)
    }

    UserService.getUsers = async () => {
        return await User.find({})
    }

    UserService.findOne = async (filters) => {
        return await User.findOne(filters)
    }

    UserService.addPiece = async (userId, piece) => {
        const user = await User.findById(userId)
        user.pieces.push(piece)
        return await user.save()
    }

    UserService.testMethod = () => {
        return User.sayHi()
    }

    UserService.validateUsername = (username) => {
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

    UserService.createUser = async ({ username, password }) => {
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
            UserService.validateUsername(username)
        } catch (e) {
            e.statusCode = 400
            throw e
        }

        const hashed = await AuthService.hashPassword(password)
        const user = new User({ username, password: hashed })
        return await user.save()
    }

    UserService.deleteUserById = async (userId) => {
        const user = await User.findById(userId)
        return await user.remove()
    }

    UserService.deleteAll = async (username, password) => {
        return await User.deleteMany({})
    }

    UserService.updateProperty = async (user) => {
        const foundUser = await getUserById(User)(user._id)
        foundUser.set({ ...user })
        return await foundUser.save()
    }

    return UserService
}

module.exports = createUserService
