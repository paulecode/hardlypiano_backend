const app = require("../app")
const db = require("../db")
const request = require("supertest")

jest.mock("../services/pieceService")

describe("makes successful API call", () => {
    let user = {
        username: "foo",
        password: "bar",
    }
    let authToken
    let userId

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

    describe("/ ---------------", () => {
        describe("GET /", () => {
            it("returns hello, world", async () => {
                const response = await request(app).get("/")
                expect(response.text).toBeDefined()
                expect(response.text).toEqual("Hello World!")
            })
            it("returns an error if no db connection", async () => {
                await db.close()
                const response = await request(app).get("/")
                expect(response.status).toEqual(500)
            })
        })
    })
    describe("/auth ---------------", () => {
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
    describe("/users ---------------", () => {
        beforeAll(async () => {
            const response = await request(app).post("/auth/login").send(user)
            userId = response.body.id
            authToken = response.headers["auth-token"]
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
            it("returns with user object", async () => {
                const response = await request(app)
                    .get("/users")
                    .set("Auth-Token", authToken)
                    .send()
                expect(response.statusCode).toEqual(200)
                expect(response.body.username).toBeDefined()
            })
        })
    })
    describe("/pieces ---------------", () => {
        describe("GET /", () => {
            it("requires authentication", async () => {
                const response = await request(app).get("/pieces").send()
                expect(response.statusCode).toEqual(401)
            })
            it("returns an array of pieces", async () => {
                const response = await request(app)
                    .get("/pieces")
                    .set("Auth-Token", authToken)
                    .send()
                expect(response.statusCode).toEqual(200)
                const { data } = response.body
                expect(data).toBeInstanceOf(Array)
            })
        })
        describe("GET /pieces/:id", () => {
            it("returns a piece by id", async () => {
                const response = await request(app)
                    .get("/pieces/12345")
                    .set("Auth-Token", authToken)
                    .send()
                const { data } = response.body
                expect(data).toBeDefined()
                expect(data.title).toBeDefined()
                expect(data.composer).toBeDefined()
            })
        })
        describe("POST /", () => {
            it("requires authentication", async () => {
                const response = await request(app).post("/pieces").send()
                expect(response.statusCode).toEqual(401)
            })
            it("saves a piece to the database and returns it in response", async () => {
                const piece = {
                    title: "Nocturne",
                    composoer: "Chopin",
                }
                const response = await request(app)
                    .post("/pieces")
                    .set("Auth-Token", authToken)
                    .send(piece)

                expect(response.status).toEqual(200)

                const { data } = response.body
                expect(data.title).toEqual(piece.title)
                expect(data.composer).toEqual(piece.composer)
            })
        })
        describe("DELETE /", () => {
            it("requires authentication", async () => {
                const response = await request(app).delete("/pieces").send()
                expect(response.statusCode).toEqual(401)
            })
            it("expects json in request body", async () => {
                const response = await request(app)
                    .delete("/pieces")
                    .set("Auth-Token", "12345")
                    .send()
                expect(response.statusCode).not.toEqual(200)
            })
        })
        describe("DELETE /:id", () => {})
    })
})
