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
            return await FriendsService.acceptFriendRequest(
                sender._id,
                receiver._id
            )
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
            newFriend.friends.outgoingRequests.filter(
                (req) => req.toString() !== userId.toString()
            )
        await newFriend.save()

        return newFriend
    }

    FriendsService.acceptAllFriendRequests = async (userId) => {
        const user = await User.findById(userId)
        const { incomingRequests } = user.friends

        for (const friendId of incomingRequests) {
            await FriendsService.acceptFriendRequest(userId, friendId)
        }
        return
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

    FriendsService.removeFriendRequest = async (userId, senderId) => {
        const user = await User.findById(userId)
        const sender = await User.findById(senderId)

        user.friends.incomingRequests = user.friends.incomingRequests.filter(
            (friendRequestId) =>
                friendRequestId.toString() !== senderId.toString()
        )
        sender.friends.outgoingRequests = user.friends.outgoingRequests.filter(
            (friendRequestId) =>
                friendRequestId.toString() !== userId.toString()
        )
        await user.save()
        await sender.save()
    }
    FriendsService.cancelFriendRequest = async (userId, senderId) => {
        const user = await User.findById(userId)
        const sender = await User.findById(senderId)

        user.friends.outgoingRequests = user.friends.outgoingRequests.filter(
            (friendRequestId) =>
                friendRequestId.toString() !== senderId.toString()
        )
        sender.friends.incomingRequests = user.friends.incomingRequests.filter(
            (friendRequestId) =>
                friendRequestId.toString() !== userId.toString()
        )
        await user.save()
        await sender.save()
    }
    return FriendsService
}

module.exports = createFriendsService
