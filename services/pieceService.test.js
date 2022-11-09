const PieceServiceConstructor = require("./pieceService")
const db = require("../db")
const PieceModel = require("../models/Piece")
const UserModel = require("../models/User")
const UserService = require("../services/userService")(UserModel)
const PieceService = PieceServiceConstructor(PieceModel, UserService)

describe("PieceService functions", () => {
    let user
    let userId

    beforeAll(async () => {
        await db.connect()
    })

    afterAll(async () => {
        await db.close()
    })

    it("is defined", () => {
        expect(PieceService).toBeDefined()
    })

    describe("PieceService.createPiece", () => {
        beforeAll(async () => {
            user = await UserService.createUser({
                username: "foo",
                password: "bar",
            })
            userId = user._id
        })
        afterAll(async () => {
            await db.clear()
        })

        it("is defined", () => {
            expect(PieceService.createPiece).toBeDefined()
        })

        it("creates a piece with title and composer", async () => {
            const pieceDetails = { title: "Nocturne 1", composer: "Chopin" }
            const piece = await PieceService.createPiece(userId, pieceDetails)

            expect(piece.title).toEqual(pieceDetails.title)
            expect(piece.composer).toEqual(pieceDetails.composer)
        })
        it("doesn't create a piece without title and composer", async () => {
            const pieceDetails = { title: "Nocturne" }
            expect(async () => {
                const piece = await PieceService.createPiece(
                    userId,
                    pieceDetails
                )
            }).rejects.toThrow()
        })
        it("doesn't create a piece with a missing or invalid userId", async () => {
            const pieceDetails = { title: "Nocturne" }
            expect(
                async () => await PieceService.createPiece(null, pieceDetails)
            ).rejects.toThrow()
            expect(
                async () => await PieceService.createPiece("abc", pieceDetails)
            ).rejects.toThrow()
        })
    })
    describe("manipulating saved pieces", () => {
        const pieces = [
            { title: "Moonlight Sonata", composer: "Beethoven" },
            { title: "Nocturne Op 2", composer: "Chopin" },
            { title: "Waltz of the Flowers", composer: "Tchaikovsky" },
            { title: "Für Elise", composer: "Beethoven" },
        ]
        beforeAll(async () => {
            user = await UserService.createUser({
                username: "foo",
                password: "bar",
            })
            userId = user._id
            await Promise.all(
                pieces.map((piece) =>
                    PieceService.createPiece(userId, { ...piece })
                )
            )
        })
        describe("PieceService.getPieces", () => {
            it("is defined", () => {
                expect(PieceService.getPieces).toBeDefined()
            })
            it("gets all pieces", async () => {
                const found = await PieceService.getPieces(userId)
                expect((found.length = pieces.length))
            })
            it("doesn't get pieces without userId", async () => {
                expect(
                    async () => await PieceService.getPieces()
                ).rejects.toThrow()
            })
            it("returns empty array for new user", async () => {
                const user2 = await UserService.createUser({
                    username: "fizz",
                    password: "buzz",
                })
                const found = await PieceService.getPieces(user2._id)
                expect(found.length).toEqual(0)
            })
        })
        describe("PieceService.getPieceById", () => {
            it("is defined", () => {
                expect(PieceService.getPieceById).toBeDefined()
            })
            it("gets piece by userId and pieceId", async () => {
                const savedPieces = await PieceService.getPieces(userId)
                const pieceId = savedPieces[0]._id

                const piece = await PieceService.getPieceById(userId, pieceId)
                expect(pieces.map((p) => p.title)).toContain(piece.title)
            })
            it("throws an error if userId or pieceId missing", async () => {
                expect(
                    async () => await PieceService.getPieceById(null, "abc")
                ).rejects.toThrow()
                expect(
                    async () => await PieceService.getPieceById(userId)
                ).rejects.toThrow()
            })
            it("throws an error if piece doesn't exist", async () => {
                expect(
                    async () => await PieceService.getPieceById(userId, "abc")
                ).rejects.toThrow()
            })
        })
        describe("PieceService.updatePiece", () => {
            it("is defined", () => {
                expect(PieceService.updatePiece).toBeDefined()
            })
            it("edits and saves a piece in place", async () => {
                const savedPieces = await PieceService.getPieces(userId)
                const before = savedPieces.length
                const piece = savedPieces[0]

                await PieceService.updatePiece(userId, piece._id, {
                    composer: "Irakli",
                })
                const updatedPiece = await PieceService.getPieceById(
                    userId,
                    piece._id
                )
                expect(updatedPiece.composer).toEqual("Irakli")

                const updatedPieces = await PieceService.getPieces(userId)
                const after = updatedPieces.length

                expect(before).toEqual(after)
            })
        })
        describe("PieceService.deleteAllPieces", () => {
            it("is defined", () => {
                expect(PieceService.deleteAllPieces).toBeDefined()
            })
            it("deletes all pieces and returns a count", async () => {
                const deletedCount = await PieceService.deleteAllPieces(userId)
                expect(typeof deletedCount).toEqual("number")
                expect(deletedCount).toBeGreaterThan(0)
                const found = await PieceService.getPieces(userId)
                expect(found.length).toEqual(0)
            })
            it("throws an error if userId not provided", async () => {
                expect(
                    async () => await PieceService.deleteAllPieces()
                ).rejects.toThrow()
            })
        })
    })
})
