const UserServiceConstructor = require("./userService")
const db = require("../db")
const ModelMock = require("../mocks/userMock")

describe("creating Users with UserService", () => {
    let UserService

    const users = []
    class UserMock extends ModelMock {
        constructor(obj) {
            super(obj, users)
        }
    }

    beforeAll(async () => {
        UserService = UserServiceConstructor(UserMock)
    })

    it("creates a User with username and password", async () => {
        const username = "foo"
        const password = "bar"
        const user = await UserService.createUser({ username, password })

        expect(user.username).toEqual(username)
    })
})
