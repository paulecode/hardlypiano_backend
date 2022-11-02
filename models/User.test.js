const User = require("./User")
const db = require("../db")

describe("model User is defined and functional", () => {
    beforeAll(async () => {
        await db.connect()
    })
    beforeEach(async () => {
        await db.clear()
    })
    afterAll(async () => {
        await db.close()
    })

    it("model User is defined", () => {
        expect(User).toBeDefined()
    })
    it("model User accepts username and password", () => {
        const user = new User({
            username: "foo",
            password: "bar",
        })
        expect(user.username).toBeDefined()
        expect(user.password).toBeDefined()
    })
    it("model User is successfully saved", async () => {
        const user = new User({
            username: "foo",
            password: "bar",
        })
        const saved = await user.save()
        expect(saved.username).toEqual(user.username)
        expect(saved.password).toEqual(user.password)
    })
    it("model User requires username and password", async () => {
        const user = new User({ username: "foo" })
        expect(await user.save).toThrow()
    })
    it("model User rejects null input and empty strings", async () => {
        const user1 = new User({ username: null, password: null })
        expect(await user1.save).toThrow()

        const user2 = new User({ username: "", password: "" })
        expect(await user2.save).toThrow()
    })
    it("model User rejects non-strings for username and password", async () => {
        const user1 = new User({
            username: "foo",
            password: "bar",
        })
        const saved = await user1.save()
        expect(saved.username).toEqual(user1.username)

        const user2 = new User({ username: 123, password: [1, 2, 3] })
        expect(await user2.save).toThrow()
    })
    it("model User is editable", async () => {
        const user = new User({ username: "foo", password: "bar" })
        const saved = await user.save()

        saved.username = "baz"
        await saved.save()

        const oldUsername = await User.findOne({ username: "foo" })
        const newUsername = await User.findOne({ username: "baz" })
        expect(oldUsername).toEqual(null)
        expect(newUsername).not.toEqual(null)
    })
    it("model User can't be edited with numbers", async () => {
        const user = new User({ username: "foo", password: "bar" })
        const saved = await user.save()

        user.username = ""
        expect(await user.save).toThrow()

        user.username = null
        expect(await user.save).toThrow()

        user.username = 2030
        expect(await user.save).toThrow()
    })
    it("model User is initialized with pieces array", () => {
        const user = new User({ username: "foo", password: "bar" })
        expect(user.pieces).toBeInstanceOf(Array)
    })
    it("model User rejects fields not in model", async () => {
        const user = new User({
            username: "foo",
            email: "foo@bar.com",
            password: "bar",
        })
        const saved = await user.save()
        expect(saved.username).toBeDefined()
        expect(saved.email).not.toBeDefined()
    })
})
