const db = require("../../db/production-db")
const mongoose = require("mongoose")

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
})
