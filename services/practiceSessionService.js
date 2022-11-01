const PracticeModel = require("../models/PracticeSession")

const PieceService = require("../services/pieceService")()

const addPracticeSession =
    (Practice, Piece) =>
    async ({ userId, pieceId, practiceDetails }) => {
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

module.exports = (Practice = PracticeModel, Piece = PieceService) => {
    return {
        addPracticeSession: addPracticeSession(Practice, Piece),
    }
}
