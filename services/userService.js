const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

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

const deleteUserById = (User) => async (userId) => {
    const user = await User.findById(userId)
    return await user.remove()
}

const deleteAll = (User) => async (username, password) => {
    return await User.deleteMany({})
}

const sendFriendRequest = (User) => async (fromUserId, toUserId) => {
    const sender = await User.findById(fromUserId)
    const receiver = await User.findById(toUserId)

    if (receiver.friends.incomingRequests.includes(sender._id)) {
        throw new Error("Friend request already pending.")
    }

    if (sender.friends.incomingRequests.includes(receiver._id)) {
        acceptFriendRequest(User)(sender._id, receiver._id)
        return
    }

    sender.friends.outgoingRequests.push(receiver._id)
    receiver.friends.incomingRequests.push(sender._id)

    await sender.save()
    await receiver.save()
}

const acceptFriendRequest = (User) => async (userId, friendId) => {
    console.log("FRIENDSHIP TIME")

    const user = await User.findById(userId)
    if (!user.friends.incomingRequests.includes(friendId)) {
        throw new Error("UserID was not found in incoming requests.")
    }

    // TODO: clean up
    user.friends.active.push(friendId)
    user.friends.incomingRequests = user.friends.incomingRequests.filter(
        (req) => {
            return req.toString() !== friendId.toString()
        }
    )
    await user.save()

    const newFriend = await User.findById(friendId)
    newFriend.friends.active.push(userId)
    newFriend.friends.outgoingRequests = user.friends.incomingRequests.filter(
        (req) => req.toString() !== userId.toString()
    )
    await newFriend.save()

    return newFriend
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
        sendFriendRequest: sendFriendRequest(User),
        acceptFriendRequest: acceptFriendRequest(User),
    }
}
