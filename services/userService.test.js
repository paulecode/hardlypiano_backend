const db = require("../db")
const User = require("../models/User")
const UserServiceConstructor = require("./userService")
const UserService = UserServiceConstructor(User)

beforeAll(async () => {
    await db.connect()
})

afterAll(async () => {
    await db.close()
})

describe("UserService functions", () => {
    let user

    beforeAll(async () => {
        user = await UserService.createUser({
            username: "foo",
            password: "bar",
        })
        expect(user).toBeDefined()
    })

    describe("UserService.create", () => {
        it("created user is saved to the database", async () => {
            const found = await User.findOne({ username: "foo" })
            expect(found.username).toEqual(user.username)
        })
        it("hashes the password", async () => {
            const found = await User.findOne({ username: "foo" })
            expect(found.password).not.toEqual("bar")
        })
        it("doesn't create a User with same username", async () => {
            expect(async () => {
                const user = await UserService.createUser({ ...userExample })
            }).rejects.toThrow()
        })
    })
    describe("UserService.findOne", () => {
        it("finds a user with a username", async () => {
            const found = await UserService.findOne({ username: "foo" })
            expect(found._id).toBeDefined()
        })
        it("returns null with no match", async () => {
            const found = await UserService.findOne({ username: "khaleesi" })
            expect(found).toEqual(null)
        })
    })
    describe("UserService.deleteUserById", () => {
        it("creates and deletes a user", async () => {
            const user2 = await UserService.createUser({
                username: "irakli",
                password: "secret",
            })
            const before = await UserService.findOne({ username: "irakli" })
            expect(before).not.toEqual(null)

            await UserService.deleteUserById(user2._id)
            const after = await UserService.findOne({ username: "irakli" })
            expect(after).toEqual(null)
        })
    })
})
