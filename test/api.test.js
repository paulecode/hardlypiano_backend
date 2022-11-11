const app = require("../app")
const db = require("../db")
const request = require("supertest")

describe("makes successful API call", () => {
    beforeAll(async () => {
        await db.connect()
    })
    beforeEach(async () => {
        if (!db.connected()) {
            await db.connect()
        }
    })
    afterAll(async () => {
        await db.close()
    })

    it("makes a call to /", async () => {
        const response = request(app).get("/")
        console.log(response)
        expect(response).toBeDefined()
    })
})
