require("dotenv").config()
const db = require("./development-db")
const mongoose = require("mongoose")
const User = require("../models/User")

describe("connects to production db", () => {
    beforeEach(async () => {
        await db.connect()
    })
    afterEach(async () => {
        await db.close()
    })
    it("connected to a database", () => {
        expect(mongoose.connection.readyState).toEqual(1)
    })
    it("finds a collection for model User", async () => {
        const found = await User.find({}).limit(10)
        expect(found).toBeInstanceOf(Array)
    })
})
