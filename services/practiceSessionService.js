const PracticeModel = require("../models/PracticeSession")

// const UserService = require("../services/userService")()
const PieceService = require("../services/pieceService")()

const createPracticeSessionService = (PracticeSession = PracticeModel) => {
    const PracticeService = {}

    PracticeService.getAll = async (userId, pieceId) => {
        const piece = await PieceService.getPieceById(userId, pieceId)
        const { totalPracticeMinutes, lastPracticedDate } = piece
        const practiceSessions = piece.practiceSessions

        return {
            totalPracticeMinutes,
            lastPracticedDate,
            practiceSessions,
        }
    }

    PracticeService.getById = async (userId, pieceId, practiceId) => {
        const piece = await PieceService.getPieceById(userId, pieceId)
        const practiceSession = piece.practiceSession.id(practiceId)
        return practiceSession
    }

    PracticeService.calculateDiffInMinutes = (startDate, endDate) => {
        const ms = endDate - startDate
        const minutes = Math.floor(ms / 1000 / 60)

        return minutes
    }

    PracticeService.createPracticeSession = async (startISO, endISO) => {
        const startTime = new Date(startISO)
        const endTime = new Date(endISO)

        const durationInMinutes = PracticeService.calculateDiffInMinutes(
            startTime,
            endTime
        )
        // console.log("HERE IS DURATION", startTime, endTime, durationInMinutes)
        const practiceSession = new PracticeSession({
            startTime,
            endTime,
            durationInMinutes,
        })
        return practiceSession
    }
    return PracticeService
}

module.exports = createPracticeSessionService
