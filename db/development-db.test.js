require("dotenv").config()
const db = require("./development-db")
const mongoose = require("mongoose")

describe("connects to production db", () => {
    afterEach(async () => {
        await db.close()
    })
    it("establishes connection to db", (done) => {
        db.connect()
        mongoose.connection.on("open", done)
    })
})
