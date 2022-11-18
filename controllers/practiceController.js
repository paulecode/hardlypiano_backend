const PracticeService = require("../services/practiceSessionService")()

const PracticeController = {}

PracticeController.post = async (req, res, next) => {
    const userId = req.user._id
    const pieceId = req.params.pieceId

    try {
        const { startDate, endDate } = req.body
        const session = await PracticeService.createPracticeSession(
            startDate,
            endDate
        )
        await PieceService.addPracticeSession(userId, pieceId, session)
        res.status(200).send({
            message: "Practice session added successfuly",
            data: session,
        })
    } catch (e) {
        next(e)
    }
}

PracticeController.get = async (req, res) => {
    const userId = req.user._id
    const pieceId = req.params.pieceId
    const practiceId = req.params.id

    try {
        const session = await PracticeService.getById(
            userId,
            pieceId,
            practiceId
        )
        if (session) res.status(200).send({ data: session })
        else res.status(404).send({ message: "Practice session not found." })
    } catch (e) {
        next(e)
    }
}

PracticeController.delete = async (req, res) => {
    const userId = req.user._id
    const pieceId = req.params.pieceId
    const practiceId = req.params.id

    try {
        await PieceService.removePracticeSession(userId, pieceId, practiceId)
        res.status(200).send({
            Message: "Practice session deleted successfully",
        })
    } catch (e) {
        next(e)
    }
}

PracticeController.getAll = async (req, res) => {
    const userId = req.user._id
    const pieceId = req.params.pieceId

    try {
        const data = await PracticeService.getAll(userId, pieceId)
        res.status(200).send(data)
    } catch (e) {
        next(e)
    }
}

module.exports = PracticeController
