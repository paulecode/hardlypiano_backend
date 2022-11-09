const UserModel = require("../models/User")

const createFriendsService = (User = UserModel) => {
    const FriendsService = {}

    FriendsService.getFriendsOfUser = async (userId) => {
        const user = await User.findById(userId).populate("friends.active")
        const friends = user.friends.active.map((friend) => {
            return {
                _id: friend._id,
                username: friend.username,
            }
        })

        return friends
    }

    FriendsService.sendFriendRequest = async (fromUserId, toUserId) => {
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

    FriendsService.acceptFriendRequest = async (userId, friendId) => {
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
        newFriend.friends.outgoingRequests =
            user.friends.incomingRequests.filter(
                (req) => req.toString() !== userId.toString()
            )
        await newFriend.save()

        return newFriend
    }

    FriendsService.removeFriend = async (userId, enemyId) => {
        const user = await User.findById(userId)
        user.friends.active = user.friends.active.filter(
            (friendId) => friendId.toString() !== enemyId.toString()
        )
        const enemy = await User.findById(enemyId)
        enemy.friends.active = enemy.friends.active.filter(
            (friendId) => friendId.toString() !== userId.toString()
        )
        await user.save()
        await enemy.save()
    }
    return FriendsService
}

module.exports = createFriendsService
