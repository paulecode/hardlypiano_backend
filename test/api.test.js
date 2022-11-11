const app = require("../app")
const db = require("../db")
const request = require("supertest")

describe("makes successful API call", () => {
    const OLD_ENV = process.env

    beforeAll(async () => {
        await db.connect()
        process.env = { ...OLD_ENV }
        process.env.TOKEN_SECRET = "12345"
    })
    beforeEach(async () => {
        if (!db.connected()) {
            await db.connect()
        }
    })
    afterAll(async () => {
        await db.close()
        process.env = OLD_ENV
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
    describe("/users", () => {
        let user = {
            username: "foo",
            password: "bar",
        }
        let userId
        let authToken
        beforeAll(async () => {
            const response = await request(app).post("/auth/login").send(user)
            userId = response.body.id
            authToken = response.headers["auth-token"]
            console.log(authToken)
        })
        describe("GET /", () => {
            it("is defined", async () => {
                const response = await request(app).get("/users").send()
                expect(response.statusCode).not.toEqual(404)
            })
            it("requires authentication", async () => {
                const response = await request(app).get("/users").send()
                expect(response.statusCode).toEqual(401)
            })
            it("if authenticated, returns with user object", async () => {
                const response = await request(app)
                    .get("/users")
                    .set("Auth-Token", authToken)
                    .send()
                console.log(response.error)
                expect(response.statusCode).toEqual(200)
                expect(response.body.data.user).toBeDefined()
            })
        })
    })
})
