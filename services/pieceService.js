const PieceModel = require("../models/Piece.js")
const userService = require("./userService")()

const createPieceService = (Piece = PieceModel, UserService = userService) => {
    const PieceService = {}

    PieceService.getPieces = async (userId) => {
        if (!userId) throw new Error("User not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        return user.pieces
    }

    PieceService.createPiece = async (userId, pieceDetails) => {
        if (!userId) throw new Error("User not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        const piece = new Piece(pieceDetails)
        piece.lastPracticedDate = null
        piece.totalPracticeMinutes = 0
        await piece.save()
        await UserService.addPiece(userId, piece)

        return piece
    }

    PieceService.getPieceById = async (userId, pieceId) => {
        if (!userId) throw new Error("User ID not provided.")
        if (!pieceId) throw new Error("Piece ID not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        const piece = user.pieces.id(pieceId)
        if (!piece) throw new Error("Piece not found.")

        return piece
    }

    PieceService.updatePiece = async (userId, pieceId, pieceDetails) => {
        if (!userId) throw new Error("User not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        const piece = user.pieces.id(pieceId)
        piece.set({ ...pieceDetails })

        await user.save()

        return piece
    }

    PieceService.deletePiece = async (userId, pieceId) => {
        if (!userId) throw new Error("User not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        await user.pieces.id(pieceId).remove()
        await user.save()

        return
    }

    PieceService.addPracticeSession = async (
        userId,
        pieceId,
        practiceSession
    ) => {
        const user = await UserService.getUserById(userId)
        const piece = user.pieces.id(pieceId)

        piece.practiceSessions.push(practiceSession)
        piece.lastPracticedDate = practiceSession.endDate
        user.pieces
            .id(pieceId)
            .set("lastPracticedDate", practiceSession.endDate)

        await user.save()

        return practiceSession
    }

    PieceService.removePracticeSession = async (
        userId,
        pieceId,
        practiceId
    ) => {
        try {
            const user = await UserService.getUserById(userId)
            user.pieces.id(pieceId).practiceSessions.id(practiceId).remove()
            await user.save()

            return
        } catch (e) {
            throw e
        }
    }

    PieceService.removeAllPracticeSessions = async (userId, pieceId) => {
        const user = await UserService.getUserById(userId)
        const piece = user.pieces.id(pieceId)

        piece.set({ practiceSessions: [] })
        piece.set({ lastPracticedDate: null })
        await PieceService.updateTotalPracticeTime(userId, pieceId)

        await user.save()
        return
    }

    PieceService.updateTotalPracticeTime = async (userId, pieceId) => {
        const user = await UserService.getUserById(userId)
        const piece = user.pieces.id(pieceId)
        const totalTime = piece.practiceSessions.reduce(
            (acc, session) => acc + session.durationInMinutes,
            0
        )

        piece.set({ totalPracticeMinutes: totalTime })

        await user.save()

        return
    }

    PieceService.deleteManyPieces = async (userId, pieceIds) => {
        if (!userId) throw new Error("User not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        let count = 0

        await Promise.all(
            pieceIds.map((pieceId) => {
                const piece = user.pieces.id(pieceId)
                if (piece) {
                    count++
                    return user.pieces.id(pieceId).remove()
                }
                return
            })
        )
        await user.save()

        return count
    }

    PieceService.getSortedPieces = async (userId, compareFn) => {
        const user = await UserService.getUserById(userId)
        const pieces = user.pieces.sort(compareFn)
        return pieces
    }

    PieceService.getRecentlyPracticed = async (userId) => {
        const compare = (a, b) => b.lastPracticedDate - a.lastPracticedDate
        const sorted = await PieceService.getSortedPieces(userId, compare)
        return sorted[0]
        // return piee
    }

    PieceService.getLongestSincePractice = async (userId) => {
        const compare = (a, b) => a.lastPracticedDate - b.lastPracticedDate
        const sorted = await PieceService.getSortedPieces(userId, compare)
        return sorted[0]
    }

    PieceService.getMostPracticed = async (userId) => {
        const compare = (a, b) =>
            b.totalPracticeMinutes - a.totalPracticeMinutes
        const sorted = await PieceService.getSortedPieces(userId, compare)
        return sorted[0]
    }

    PieceService.getLeastPracticed = async (userId) => {
        const compare = (a, b) =>
            a.totalPracticeMinutes - b.totalPracticeMinutes
        const sorted = await PieceService.getSortedPieces(userId, compare)
        return sorted[0]
    }

    PieceService.deleteAllPieces = async (userId) => {
        if (!userId) throw new Error("User not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        const pieces = await PieceService.getPieces(userId)

        let count = pieces.length

        user.pieces = []
        await user.save()
        return count
    }

    return PieceService
}

module.exports = createPieceService
