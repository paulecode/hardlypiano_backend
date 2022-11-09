const db = require("../db/test-db")
const FriendsService = require("../services/friendsService")()
const UserService = require("../services/userService")()

beforeAll(async () => {
    await db.connect()
    await db.clear()
})

afterAll(async () => {
    await db.close()
})

describe("FriendService tests", () => {
    const usersCount = 4
    let users = []
    const refresh = async () => {
        users = await UserService.getUsers({})
    }

    beforeEach(async () => {
        await db.clear()
        for (let i = 0; i < usersCount; i++) {
            await UserService.generateFakeUser(`user${i}`)
        }
        await refresh()
    })

    describe("FriendsService.sendFriendRequest", () => {
        it("is defined", () => {
            expect(FriendsService.sendFriendRequest).toBeDefined()
        })
        it("expects userId and friendId", async () => {
            expect(async () => {
                await FriendsService.sendFriendRequest()
            }).rejects.toThrow()
        })
        it("sends a friend request from user0 to user1", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[1]._id)
            await refresh()
            expect(users[0].friends.outgoingRequests).toContainEqual(
                users[1]._id
            )
            expect(users[1].friends.incomingRequests).toContainEqual(
                users[0]._id
            )
        })
        it("doesn't send multiple friend requests", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[1]._id)
            expect(async () => {
                await FriendsService.sendFriendRequest(
                    users[0]._id,
                    users[1]._id
                )
            }).rejects.toThrow()
            await refresh()
            expect(users[1].friends.incomingRequests.length).toEqual(1)
        })
        it("sends a request from user0 to user1 and user0 to user2", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[1]._id)
            await FriendsService.sendFriendRequest(users[0]._id, users[2]._id)
            await refresh()

            expect(users[0].friends.outgoingRequests.length).toEqual(2)
            expect(users[1].friends.incomingRequests.length).toEqual(1)
            expect(users[2].friends.incomingRequests.length).toEqual(1)
        })
        it("accepts an existing friend request if receiver sends a friend request", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[1]._id)
            await FriendsService.sendFriendRequest(users[1]._id, users[0]._id)
            await refresh()

            expect(users[0].friends.outgoingRequests.length).toEqual(0)
            expect(users[1].friends.outgoingRequests.length).toEqual(0)
            expect(users[0].friends.incomingRequests.length).toEqual(0)
            expect(users[1].friends.incomingRequests.length).toEqual(0)
            expect(users[0].friends.active).toContainEqual(users[1]._id)
            expect(users[1].friends.active).toContainEqual(users[0]._id)
        })
    })
    describe("FriendsService.acceptFriendRequest", () => {
        it("accepts an existing request, removing them from pending requests", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[1]._id)
            await refresh()

            expect(users[0].friends.outgoingRequests.length).toEqual(1)
            expect(users[1].friends.incomingRequests.length).toEqual(1)

            await FriendsService.acceptFriendRequest(users[1]._id, users[0]._id)
            await refresh()

            expect(users[0].friends.outgoingRequests.length).toEqual(0)
            expect(users[1].friends.incomingRequests.length).toEqual(0)
            expect(users[0].friends.active).toContainEqual(users[1]._id)
            expect(users[1].friends.active).toContainEqual(users[0]._id)
        })
        it("doesn't accept a friend request that's not there", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[1]._id)
            expect(async () => {
                await FriendsService.acceptFriendReqest(
                    users[0]._id,
                    users[1]._id
                )
            }).rejects.toThrow()
            expect(async () => {
                await FriendsService.acceptFriendReqest(
                    users[1]._id,
                    users[2]._id
                )
            }).rejects.toThrow()
        })
    })
    describe("FriendsService.acceptAllFriendRequests", () => {
        it("is defined", () => {
            expect(FriendsService.acceptAllFriendRequests).toBeDefined()
        })
        it("accepts two pending friend requests", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[2]._id)
            await FriendsService.sendFriendRequest(users[1]._id, users[2]._id)
            await FriendsService.acceptAllFriendRequests(users[2]._id)
            await refresh()

            expect(users[0].friends.outgoingRequests.length).toEqual(0)
            expect(users[1].friends.outgoingRequests.length).toEqual(0)
            expect(users[2].friends.incomingRequests.length).toEqual(0)

            expect(users[0].friends.active.length).toEqual(1)
            expect(users[1].friends.active.length).toEqual(1)
            expect(users[2].friends.active.length).toEqual(2)
        })
    })
    describe("FriendsService.removeFriend", () => {
        it("is defined", () => {
            expect(FriendsService.acceptAllFriendRequests).toBeDefined()
        })
        it("removes an existing friend", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[2]._id)
            await FriendsService.acceptFriendRequest(users[1]._id, users[0]._id)

            await FriendsService.removeFriend(users[0]._id, users[1]._id)
            await refresh()

            expect(users[0].friends.active.length).toEqual(0)
            expect(users[1].friends.active.length).toEqual(0)
        })
    })
    describe("FriendsService.removeFriendRequest", () => {
        it("is defined", () => {
            expect(FriendsService.removeFriendRequest).toBeDefined()
        })
        it("removes a pending friend request, by the receiver", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[1]._id)
            await FriendsService.removeFriendRequest(users[1]._id, users[0]._id)
            await refresh()

            expect(users[0].friends.outgoingRequests.length).toEqual(0)
            expect(users[1].friends.incomingRequests.length).toEqual(0)
        })
    })
    describe("FriendsService.cancelFriendRequest", () => {
        it("is defined", () => {
            expect(FriendsService.cancelFriendRequest).toBeDefined()
        })
        it("cancels a pending friend request, by the sender", async () => {
            await FriendsService.sendFriendRequest(users[0]._id, users[1]._id)
            await FriendsService.cancelFriendRequest(users[0]._id, users[1]._id)
            await refresh()

            expect(users[0].friends.outgoingRequests.length).toEqual(0)
            expect(users[1].friends.incomingRequests.length).toEqual(0)
        })
    })
})
