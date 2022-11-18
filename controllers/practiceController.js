const PracticeService = require("../services/practiceSessionService")()

const PracticeController = {}

PracticeController.post = async (req, res) => {
    const userId = req.user._id
    const pieceId = req.params.pieceId
    const endTime = new Date()
    const startTime = new Date(endTime.getTime() - 5 * 60 * 1000)
    const practiceDetails = {
        startTime,
        endTime,
    }

    try {
        const session = await PracticeService.addPracticeSession({
            pieceId,
            userId,
            practiceDetails,
        })
        return res.status(200).send(session)
    } catch (e) {
        res.status(400).send(e.message)
    }

    // userId comes from req.user
    // pieceId comes from express params
    // practiceDetails come from req.body

    // only startDate and endDate needed
    // durationInMinutes is calculated by services
    // await pieceService.updateTotalMinutes()
    // update pieceService.updateLastPracticed()
}

PracticeController.get = async (req, res) => {
    // userId comes from req.user
    // pieceId comes from express params
    // practiceId come from express params
    // if found
    // get practice id in piece by practiceId (findById)
}

PracticeController.delete = async (req, res) => {
    // userId comes from req.user
    // pieceId comes from express params
    // practiceId come from express params
    // if found
    // practiceService should delete practice session from piece
}

PracticeController.getAll = async (req, res) => {
    // userId comes from req.user
    // pieceId comes from express params
    // should return all practice sessions in piece
    // can be empty. must be type: Array.
}

module.exports = PracticeController
