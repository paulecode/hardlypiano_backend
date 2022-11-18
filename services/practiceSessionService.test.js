const db = require("../db")
const UserService = require("./userService")()
const PieceService = require("./pieceService")()
const PSS = require("./practiceSessionService")()

const listOfPieces = [
    { composer: "mozart", title: "lacrimosa" },
    { composer: "chopin", title: "nocturne 48 no 2" },
    { composer: "beethoven", title: "moonlight sonata" },
    { composer: "bach", title: "toccata in d minor" },
]

const dateAfterMin = (date, min) => {
    const result = new Date()
    result.setTime(date.getTime() + 1000 * 60 * min)
    return result
}

const dates = (min, dayOffset = 0) => {
    const start = new Date()
    start.setDate(start.getDate() + dayOffset)
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
        describe("correctly sorts all the pieces", () => {
            const practiceMap = {
                0: [
                    { min: 50, daysAgo: 5 },
                    { min: 5, daysAgo: 0 },
                ],
                1: [{ min: 5, daysAgo: 100 }],
                2: [{ min: 5000, daysAgo: 50 }],
                3: [{ min: 1, daysAgo: 25 }],
            }
            beforeAll(async () => {
                // for each piece
                for (const index in practiceMap) {
                    // for each practice session
                    const practiceDetails = practiceMap[index]
                    for (const entry of practiceDetails) {
                        const sessionDates = dates(entry.min, 0 - entry.daysAgo)
                        const session = await PSS.createPracticeSession(
                            sessionDates.start,
                            sessionDates.end
                        )
                        await PieceService.addPracticeSession(
                            userId,
                            pieces[index]._id,
                            session
                        )
                        await PieceService.updateTotalPracticeTime(
                            userId,
                            pieces[index]._id
                        )
                    }

                    await updatePieces()
                }
            })
            it("getRecentlyPracticed returns the most recently practiced piece (0)", async () => {
                const recent = await PieceService.getRecentlyPracticed(userId)
                console.log(recent.composer)
                expect(recent.composer).toEqual(pieces[0].composer)
            })
            it("getLongestSincePractice returns the piece practiced the longest time ago (1)", async () => {
                const longestSince = await PieceService.getLongestSincePractice(
                    userId
                )
                console.log(longestSince.composer)
                expect(longestSince.composer).toEqual(pieces[1].composer)
            })
            it("getMostPracticed returns the most practiced piece in minutes(2)", async () => {
                const most = await PieceService.getMostPracticed(userId)
                console.log(most.composer)
                expect(most.composer).toEqual(pieces[2].composer)
            })
            it("getLeastPracticed returns the least practiced piece in minutes (3)", async () => {
                const least = await PieceService.getLeastPracticed(userId)
                console.log(least.composer)
                expect(least.composer).toEqual(pieces[3].composer)
            })
            afterAll(() => {
                console.log("RESULTS")

                pieces
                    .map((piece) => {
                        const {
                            composer,
                            totalPracticeMinutes,
                            lastPracticedDate,
                        } = piece
                        return {
                            composer,
                            min: totalPracticeMinutes,
                            lastPractice: lastPracticedDate.toUTCString(),
                        }
                    })
                    .forEach(console.log)
            })
        })
    })
})
