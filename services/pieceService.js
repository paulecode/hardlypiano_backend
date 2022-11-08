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

    PieceService.addPracticeToPiece = async (piece, session) => {
        console.log(piece)
        piece.practiceSessions.push(session)
        piece.totalPracticeMinutes += session.durationInMinutes

        return await piece.save()
    }

    PieceService.updatePiece = async (userId, pieceId, pieceDetails) => {
        if (!userId) throw new Error("User not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        const piece = user.pieces.id(pieceId)
        piece.set({ ...pieceDetails })
        await piece.save()

        const saved = await user.save()

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
