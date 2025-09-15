const db = require("../../db/development-db")
const mongoose = require("mongoose")
const User = require("../../models/User")

describe("connects to development db", () => {
    beforeAll(() => {
        require("dotenv").config()
    })
    beforeEach(async () => {
        await db.connect()
    })
    afterEach(async () => {
        await db.close()
    })
    it("connected to a database", async () => {
        expect(mongoose.connection.readyState).toEqual(1)
    })
    it("database contains correct collection", async () => {
        const actualCollections = await mongoose.connection.db
            .listCollections()
            .toArray()
        const collectionNames = actualCollections.map((col) => col.name)
        expect(collectionNames).toContain("users")
        expect(collectionNames.length).toBe(1) // Only users collection should exist
    })
    it("finds a collection for model User", async () => {
        const found = await User.find({}).limit(10)
        expect(found).toBeInstanceOf(Array)
    })
})
