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

    describe("GET /", () => {
        it("returns hello, world", async () => {
            const response = await request(app).get("/")
            expect(response.text).toBeDefined()
            expect(response.text).toEqual("Hello World!")
        })
    })
    describe("/auth", () => {
        let user = {
            username: "foo",
            password: "bar",
        }
        describe("POST /register", () => {
            it("successfully registers a user", async () => {
                const response = await request(app)
                    .post("/auth/register")
                    .send(user)
                expect(response.statusCode).toEqual(200)
                expect(response.body.data).toBeDefined()
            })
        })
        describe("POST /login", () => {
            it("successfully logs in a user and receives a token", async () => {
                const response = await request(app)
                    .post("/auth/login")
                    .send(user)
                expect(response.statusCode).toEqual(200)
                expect(response.headers["auth-token"]).toBeDefined()
            })
        })
    })
})
