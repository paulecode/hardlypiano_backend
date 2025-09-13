const createMockModel = require("./createMockModel")

describe("mock User model", () => {
    const User = createMockModel([])

    beforeEach(async () => {
        await User.remove({})
    })

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
    describe("finding objects", () => {
        beforeEach(async () => {
            const beatles = [
                {
                    name: "Paul",
                    instrument: "guitar",
                },
                {
                    name: "Ringo",
                    instrument: "drums",
                },
                {
                    name: "George",
                    instrument: "bass",
                },
                {
                    name: "John",
                    instrument: "vocals",
                },
            ]
            beatles.forEach(async (beatle) => {
                const document = new User({ ...beatle })
                await document.save()
            })
        })
        it("finds all documents in collection", async () => {
            const found = await User.find({})
            expect(found.length).toEqual(4)
        })
        it("finds documents by one property", async () => {
            const found = await User.find({ name: "Paul" })
            expect(found.length).toEqual(1)
        })
        it("returns empty array for no results", async () => {
            const found = await User.find({ name: "Irakli" })
            expect(found).toBeInstanceOf(Array)
            expect(found.length).toEqual(0)
        })
        it("returns no documents on mixed properties", async () => {
            const found = await User.find({ name: "Paul", instrument: "drums" })
            expect(found.length).toEqual(0)
        })
    })
})
