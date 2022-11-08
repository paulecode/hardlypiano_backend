const db = require("./index")
const mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
    username: String,
    password: String,
})
const User = mongoose.model("User", testSchema)

describe("creates a test database", () => {
    beforeAll(async () => {
        await db.connect()
    })
    beforeEach(async () => {
        await db.clear()
    })
    afterAll(async () => {
        await db.close()
    })
    it("creates, saves and finds user", async () => {
        const username = "foo"
        const password = "bar"
        const user = new User({ username, password })
        await user.save()

        const found = await User.findOne({ username, password })
        expect(found.username).toEqual(username)
        expect(found.password).toEqual(password)
    })
    it("clears a collection after a test", async () => {
        const found = await User.find({})
        expect(found.length).toEqual(0)
    })
})
