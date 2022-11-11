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
        let authToken
        describe("POST /register", () => {
            it("successfully registers a user", async () => {
                const response = await request(app)
                    .post("/auth/register")
                    .send(user)
                expect(response.statusCode).toEqual(200)
                expect(response.body.data).toBeDefined()
            })
            it("throws an error if username or password not passed in", async () => {
                const response = await request(app)
                    .post("/auth/register")
                    .send()
                expect(response.statusCode).not.toEqual(200)
            })
            it("throws an error if fields for invalid types", async () => {
                const response = await request(app)
                    .post("/auth/register")
                    .send({ username: 123, password: [1, 2, 3] })
                expect(response.statusCode).not.toEqual(200)
            })
            it("returns an error if username already taken", async () => {
                const response = await request(app)
                    .post("/auth/register")
                    .send(user)
                expect(response.statusCode).not.toEqual(200)
            })
        })
        describe("POST /login", () => {
            it("successfully logs in a user and receives a token", async () => {
                const response = await request(app)
                    .post("/auth/login")
                    .send(user)
                expect(response.statusCode).toEqual(200)
                expect(response.headers["auth-token"]).toBeDefined()
                authToken = response.headers["auth-token"]
            })
            it("returns an error for wrong credentials", async () => {
                const response = await request(app)
                    .post("/auth/login")
                    .send({ ...user, password: "baz" })
                expect(response.statusCode).not.toEqual(200)
            })
        })
    })
})
