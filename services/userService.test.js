const UserServiceConstructor = require("./userService")
const db = require("../db")
const UserModel = require("../models/User")

describe("creating Users with UserService", () => {
    let UserService

    beforeAll(async () => {
        UserService = UserServiceConstructor(UserModel)
        await db.connect()
    })

    it("creates a User with username and password", async () => {
        const username = "foo"
        const password = "bar"
        const user = await UserService.createUser({ username, password })

        expect(user.username).toEqual(username)
    })
})
