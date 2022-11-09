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

const createUser =
    (User) =>
    async ({ username, password }) => {
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

const generateFakeUser = (User) => async (givenUsername) => {
    const crypto = require("crypto")

    const username = givenUsername || crypto.randomBytes(8).toString("base64")
    const password = crypto.randomBytes(8).toString("base64")

    try {
        const user = await createUser(User)({ username, password })
        return user
    } catch (e) {
        if (e.message !== "Username already in use.") return e
        return generateFakeUser(User)()
    }
}

const deleteUserById = (User) => async (userId) => {
    const user = await User.findById(userId)
    return await user.remove()
}

const deleteAll = (User) => async (username, password) => {
    return await User.deleteMany({})
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
        generateFakeUser: generateFakeUser(User),
    }
}
