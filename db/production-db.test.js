const db = require("./undefined-db")
const mongoose = require("mongoose")

describe("connects to production db", () => {
    beforeAll(async () => {
        require("dotenv").config()
    })
    afterEach(async () => {
        await db.close()
    })
    it("establishes connection to db", (done) => {
        db.connect()
        mongoose.connection.on("open", done)
    })
})
