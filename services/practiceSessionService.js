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

    PracticeService.addPracticeSession = async ({
        userId,
        pieceId,
        practiceDetails,
    }) => {
        const { startTime, endTime } = practiceDetails
        const durationInMinutes =
            (endTime.getTime() - startTime.getTime()) / 1000 / 60

        const practiceSession = new Practice({
            startTime,
            endTime,
            durationInMinutes,
        })

        const piece = await PieceService.getPieceById(userId, pieceId)
        await PieceService.addPracticeToPiece(piece, practiceSession)

        return await practiceSession.save()
    }
    return PracticeService
}

module.exports = createPracticeSessionService
