const createMockModel = require("./createMockModel")

describe("mock User model", () => {
    const User = createMockModel([])

    describe("creating objects", () => {
        beforeEach(async () => {
            await User.remove({})
        })
        it("creates a user object", () => {
            const user = new User({ username: "foo", password: "bar" })
            expect(user).toBeDefined()
        })
        it("saves a user", async () => {
            const user = new User({ username: "foo", password: "bar" })
            await user.save()
            const results = await User.find({})
            expect(results.length).toEqual(1)
        })
        it("edits and saves the same user", async () => {
            const user = new User({ username: "foo", password: "bar" })
            const saved = await user.save()

            saved.username = "baz"
            await saved.save()

            const results = await User.find({})
            expect(results.length).toEqual(1)
        })
    })

    describe("removing objects", () => {
        beforeEach(async () => {
            const user1 = new User({ username: "foo" })
            const user2 = new User({ username: "bar" })
            await user1.save()
            await user2.save()
        })
        it("removes all objects", async () => {
            await User.remove({})
            const found = await User.find({})
            expect(found.length).toEqual(0)
        })
        it("removes objects with a filter", async () => {
            await User.remove({ username: "foo" })
            const found = await User.find({})
            expect(found.length).toEqual(1)
        })
    })
})
