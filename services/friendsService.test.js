const db = require("../db/test-db")
const FriendsService = require("../services/friendsService")()
const UserService = require("../services/userService")()

beforeAll(async () => {
    await db.connect()
})

afterAll(async () => {
    await db.clear()
    await db.close()
})

describe("FriendService tests", () => {
    const users = {
        username: "irakli",
        password: "123",
    }
    beforeAll(() => {})
})
