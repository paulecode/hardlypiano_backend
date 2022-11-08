const PieceServiceConstructor = require("./pieceService")
const db = require("../db")
const PieceModel = require("../models/Piece")
const UserModel = require("../models/User")
const UserService = require("../services/userService")(UserModel)

describe("creating Users with UserService", () => {
    const PieceService = PieceServiceConstructor(PieceModel, UserService)

    beforeAll(async () => {
        await db.connect()
    })

    beforeEach(async () => {
        await db.clear()
    })

    afterAll(async () => {
        await db.close()
    })

    describe("PieceService.createPiece", () => {
        let user
        beforeAll(async () => {
            user = await UserService.createUser({
                username: "foo",
                password: "bar",
            })
        })
        it("creates a piece with title and composer", async () => {
            const pieceDetails = { title: "Nocturne 1", composer: "Chopin" }
            const piece = await PieceService.createPiece(user._id, pieceDetails)

            expect(piece.title).toEqual(pieceDetails.title)
            expect(piece.composer).toEqual(pieceDetails.composer)
        })
    })
})
