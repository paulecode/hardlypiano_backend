const db = require("../db/test-db")
const FriendsService = require("../services/friendsService")()
const UserService = require("../services/userService")()

beforeAll(async () => {
    await db.connect()
})

afterAll(async () => {
    await db.close()
})

describe("FriendService tests", () => {
    const usersCount = 4
    let users = []
    beforeAll(async () => {
        await db.clear()
        for (let i = 0; i < usersCount; i++) {
            const fakeUser = await UserService.generateFakeUser(`user${i}`)
            users.push(fakeUser)
        }
    })
    const refresh = async () => {
        users = await UserService.getUsers({})
    }
    describe("FriendsService.sendFriendRequest", () => {
        it("is defined", () => {
            expect(FriendsService.sendFriendRequest).toBeDefined()
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
    })
})
