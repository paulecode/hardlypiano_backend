const pieceService = require("../services/pieceService")()

const getAll = async (req, res) => {
    const userId = req.user._id
    console.log(req.body)

    try {
        const pieces = await pieceService.getPieces(userId)
        return res.status(200).send({ data: pieces })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const get = async (req, res) => {
    const userId = req.user._id
    const pieceId = req.params.id

    try {
        const piece = await pieceService.getPieceById(userId, pieceId)
        return res.status(200).send({ data: piece })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const create = async (req, res) => {
    const userId = req.user._id
    const pieceDetails = req.body

    try {
        const piece = await pieceService.createPiece(userId, pieceDetails)
        return res.status(200).send({ data: piece })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const deleteOne = async (req, res) => {
    console.log("got here")
    const userId = req.user._id
    const pieceId = req.params.id

    try {
        await pieceService.deletePiece(userId, pieceId)
        return res.status(200).send({ message: "Piece successfully deleted." })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const deleteMany = async (req, res) => {
    const userId = req.user._id
    const { pieceIds } = req.body

    if (!pieceIds || pieceIds.length === 0)
        return res.status(400).send("Bad request: pieceIds not provided.")

    try {
        const deletedCount = await pieceService.deleteManyPieces(
            userId,
            pieceIds
        )
        return res
            .status(200)
            .send({ message: `${deletedCount} pieces successfully deleted` })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const update = async (req, res) => {
    const userId = req.user._id
    const pieceId = req.params.id
    const pieceDetails = req.body

    try {
        const piece = await pieceService.updatePiece(
            userId,
            pieceId,
            pieceDetails
        )
        return res.status(200).send({ data: piece })
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
}

const getRecentlyPracticed = async (req, res, next) => {
    const userId = req.user._id
    try {
        const piece = await PieceService.getRecentlyPracticed(userId)
        res.status(200).send({ data: piece })
    } catch (e) {
        next(e)
    }
}
const getLongestSincePractice = async (req, res, next) => {
    const userId = req.user._id
    try {
        const piece = await PieceService.getLongestSincePractice(userId)
        res.status(200).send({ data: piece })
    } catch (e) {
        next(e)
    }
}
const getLeastPracticed = async (req, res, next) => {
    const userId = req.user._id
    try {
        const piece = await PieceService.getLeastPracticed(userId)
        res.status(200).send({ data: piece })
    } catch (e) {
        next(e)
    }
}
const getMostPracticed = async (req, res, next) => {
    const userId = req.user._id
    try {
        const piece = await PieceService.getMostPracticed(userId)
        res.status(200).send({ data: piece })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAll,
    create,
    get,
    update,
    deleteOne,
    deleteMany,
    getRecentlyPracticed,
    getLeastPracticed,
    getLongestSincePractice,
    getMostPracticed,
}
