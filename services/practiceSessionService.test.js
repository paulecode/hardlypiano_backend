const db = require("../db")
const UserService = require("./userService")()
const PieceService = require("./pieceService")()
const PracticeService = require("./practiceSessionService")()

const dateAfterMin = (date, min) => {
    const result = new Date()
    result.setTime(date.getTime() + 1000 * 60 * min)
    console.log(date)
    console.log(result)
    return result
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

            const session = await PracticeService.createPracticeSession(
                start,
                end
            )

            expect(session).toBeDefined()
            expect(session.startTime).toEqual(start)
            expect(session.endTime).toEqual(end)
            expect(session.durationInMinutes).toBeDefined()
        })
        it("calculates correct duration in minutes", async () => {
            const minutes = 5
            const start = new Date()
            const end = dateAfterMin(start, minutes)

            const session = await PracticeService.createPracticeSession(
                start,
                end
            )

            expect(session.durationInMinutes).toEqual(minutes)
        })
        it("returns start and end dates as Date objects", async () => {
            const start = new Date()
            const end = new Date()

            const session = await PracticeService.createPracticeSession(
                start,
                end
            )

            expect(session.startTime).toBeInstanceOf(Date)
        })
    })
})
