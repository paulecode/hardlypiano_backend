const db = require("../db")
const UserService = require("./userService")()
const PieceService = require("./pieceService")()
const PSS = require("./practiceSessionService")()

const listOfPieces = [
    { title: "mozart", composer: "lacrimosa" },
    { title: "chopin", composer: "nocturne 48 no 2" },
    { title: "beethoven", composer: "moonlight sonata" },
]

const dateAfterMin = (date, min) => {
    const result = new Date()
    result.setTime(date.getTime() + 1000 * 60 * min)
    return result
}

const dates = (min) => {
    const start = new Date()
    const end = dateAfterMin(start, min)
    return { start, end }
}

describe("PracticeService", () => {
    beforeAll(async () => {
        await db.connect()
    })

    afterAll(async () => {
        await db.close()
    })

    describe("PracticeService.createPracticeSession", () => {
        it("creates a practice session", async () => {
            const start = new Date()
            const end = new Date()

            const session = await PSS.createPracticeSession(start, end)

            expect(session).toBeDefined()
            expect(session.startDate).toEqual(start)
            expect(session.endDate).toEqual(end)
            expect(session.durationInMinutes).toBeDefined()
        })
        it("calculates correct duration in minutes", async () => {
            const minutes = 5
            const start = new Date()
            const end = dateAfterMin(start, minutes)

            const session = await PSS.createPracticeSession(start, end)

            expect(session.durationInMinutes).toEqual(minutes)
        })
        it("returns start and end dates as Date objects", async () => {
            const start = new Date()
            const end = new Date()

            const session = await PSS.createPracticeSession(start, end)

            expect(session.startDate).toBeInstanceOf(Date)
        })
    })
    describe("getting existing practice sessions", () => {
        let user
        let userId
        let pieces
        let practicedPiece
        beforeAll(async () => {
            user = await UserService.createUser({
                username: "iraki",
                password: "bluudalskj",
            })
            userId = user._id
            await Promise.all(
                listOfPieces.map((piece) =>
                    PieceService.createPiece(userId, { ...piece })
                )
            )
            pieces = await PieceService.getPieces(userId)
            practicedPiece = pieces[0]
        })

        const updatePieces = async () => {
            pieces = await PieceService.getPieces(userId)
            practicedPiece = pieces[0]
        }

        describe("setup worked", () => {
            it("has a user and a list of pieces", () => {
                expect(user).toBeDefined()
                expect(userId).toEqual(user._id)
                expect(pieces).toBeInstanceOf(Array)
                expect(pieces[0].title).toBeDefined()
            })
        })
        describe("PieceService.addPracticeSession works", () => {
            beforeEach(async () => {
                await PieceService.removeAllPracticeSessions(
                    userId,
                    practicedPiece._id
                )
                await updatePieces()
            })

            it("adds a practice session to a piece", async () => {
                const { start, end } = dates(5)
                const session = await PSS.createPracticeSession(start, end)

                await PieceService.addPracticeSession(
                    userId,
                    pieces[0]._id,
                    session
                )

                await updatePieces()
                expect(pieces[0].practiceSessions.length).toEqual(1)
                expect(pieces[0].lastPracticedDate).toBeDefined()
                expect(pieces[0].lastPracticedDate).toBeInstanceOf(Date)
            })
            it("updates total practice time", async () => {
                const s1 = dates(5)
                const s2 = dates(10)

                const session1 = await PSS.createPracticeSession(
                    s1.start,
                    s1.end
                )
                const session2 = await PSS.createPracticeSession(
                    s2.start,
                    s2.end
                )

                await PieceService.addPracticeSession(
                    userId,
                    practicedPiece._id,
                    session1
                )
                await PieceService.addPracticeSession(
                    userId,
                    practicedPiece._id,
                    session2
                )

                await PieceService.updateTotalPracticeTime(
                    userId,
                    practicedPiece._id
                )

                await updatePieces()

                expect(practicedPiece.totalPracticeMinutes).toEqual(15)
            })
            it("removes a practice session", async () => {
                const s1 = dates(5)
                const s2 = dates(10)

                const session1 = await PSS.createPracticeSession(
                    s1.start,
                    s1.end
                )
                const session2 = await PSS.createPracticeSession(
                    s2.start,
                    s2.end
                )

                await PieceService.addPracticeSession(
                    userId,
                    practicedPiece._id,
                    session1
                )
                await PieceService.addPracticeSession(
                    userId,
                    practicedPiece._id,
                    session2
                )
                await PieceService.removePracticeSession(
                    userId,
                    practicedPiece._id,
                    session1._id
                )
                await PieceService.updateTotalPracticeTime(
                    userId,
                    practicedPiece._id
                )
                await updatePieces()

                expect(practicedPiece.totalPracticeMinutes).toEqual(10)
            })
        })
    })
})
