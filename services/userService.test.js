const db = require("../db")
const User = require("../models/User")
const createUserService = require("./userService")
const UserService = createUserService(User)

beforeAll(async () => {
    await db.connect()
})

afterAll(async () => {
    await db.close()
})

describe("UserService functions", () => {
    let user
    let userExample = { username: "foo", password: "bar" }

    beforeAll(async () => {
        user = await UserService.createUser({
            ...userExample,
        })
        expect(user).toBeDefined()
    })

    describe("UserService.createUser", () => {
        it("is defined", () => {
            expect(UserService.createUser).toBeDefined()
        })
        it("created user is saved to the database", async () => {
            const found = await User.findOne({ username: "foo" })
            expect(found.username).toEqual(user.username)
        })
        it("doesn't create a User with same username", async () => {
            await expect(
                UserService.createUser({ ...userExample })
            ).rejects.toThrow()
        })
        it("converts an uppercase username to lowercase", async () => {
            const uppercasedUser = {
                username: "Fool",
                password: "bar",
            }
            const savedUser = await UserService.createUser(uppercasedUser)
            expect(savedUser.username).toEqual("fool")
            expect(savedUser.username).not.toEqual(uppercasedUser.username)
        })
        it("Does not allow to create a user with the same username but different case", async () => {
            const uppercasedFooUser = {
                username: "Foo",
                password: "bar",
            }
            expect(async () => {
                const user = await UserService.createUser(uppercasedFooUser)
            }).rejects.toThrow()
        })
        it("Does not allow a username to be shorter than 3 characters", async () => {
            const shortUsername = {
                username: "fo",
                password: "bar",
            }
            expect(async () => {
                const user = await UserService.createUser(shortUsername)
            }).rejects.toThrow()
        })
        it("Does not allow a username to be longer than 16 characters", async () => {
            const longUsername = {
                username: "chalidaasawakanjanakit",
                password: "bar",
            }
            expect(async () => {
                const user = await UserService.createUser(longUsername)
            }).rejects.toThrow()
        })
        it("Does not allow a username to contain spaces", async () => {
            const spaceUsername = {
                username: "Paul Ebert",
                password: "bar",
            }
            expect(async () => {
                const user = await UserService.createUser(spaceUsername)
            }).rejects.toThrow()
        })
        it("does not allow non alphanumeric usernames to sign up.", async () => {
            const nonAlphaNumUser = {
                username: "JoeyBad.A$$",
                password: "foobar",
            }
            expect(async () => {
                const user = await UserService.createUser(nonAlphaNumUser)
            }).rejects.toThrow()
        })
    })
    describe("UserService.find", () => {
        it("is defined", () => {
            expect(UserService.findOne).toBeDefined()
        })
        it("gets all users, returns array", async () => {
            await UserService.createUser({ username: "paul", password: "foo" })
            await UserService.createUser({
                username: "james",
                password: "bar",
            })
            const found = await UserService.find()
            expect(found).toBeInstanceOf(Array)
            expect(found.length).toBeGreaterThan(0)
        })
        it("filters by field", async () => {
            const found = await UserService.find({ username: "james" })
            expect(found.length).toEqual(1)
        })
        it("returns an empty array when no results", async () => {
            const found = await UserService.find({ username: "kanye" })
            expect(found).toBeInstanceOf(Array)
            expect(found.length).toEqual(0)
        })
    })
    describe("UserService.findOne", () => {
        it("is defined", () => {
            expect(UserService.findOne).toBeDefined()
        })
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
        it("is defined", () => {
            expect(UserService.deleteUserById).toBeDefined()
        })
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
    describe("UserService.deleteAll", () => {
        it("is defined", () => {
            expect(UserService.deleteUserById).toBeDefined()
        })
        it("deletes all users", async () => {
            const before = await UserService.find({})
            expect(before.length).not.toEqual(0)

            await UserService.deleteAll()

            const after = await UserService.find({})
            expect(after.length).toEqual(0)
        })
    })
})
