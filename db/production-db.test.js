const db = require("./production-db")
const mongoose = require("mongoose")

describe("connects to production db", () => {
    it("establishes connection to db", async (done) => {
        await db.connect()
        mongoose.connection.on("open", () => done)
    })
})
