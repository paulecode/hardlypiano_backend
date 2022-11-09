const PieceModel = require("../models/Piece.js")
const userService = require("./userService")()

// TODO test this
const getPieces = (Piece, UserService) => async (userId) => {
    if (!userId) throw new Error("User not provided.")

    const user = await UserService.getUserById(userId)
    if (!user) throw new Error("User not found.")

    return user.pieces
}

// TODO test this
const createPiece = (Piece, UserService) => async (userId, pieceDetails) => {
    if (!userId) throw new Error("User not provided.")

    const user = await UserService.getUserById(userId)
    if (!user) throw new Error("User not found.")

    const piece = new Piece(pieceDetails)
    await piece.save()
    await UserService.addPiece(userId, piece)

    return piece
}

// TODO test this
const getPieceById = (Piece, UserService) => async (userId, pieceId) => {
    if (!userId) throw new Error("User ID not provided.")
    if (!pieceId) throw new Error("Piece ID not provided.")

    const user = await UserService.getUserById(userId)
    if (!user) throw new Error("User not found.")

    const piece = user.pieces.id(pieceId)
    if (!piece) throw new Error("Piece not found.")

    return piece
}

// TODO test this
const addPracticeToPiece = (Piece) => async (piece, session) => {
    console.log(piece)
    piece.practiceSessions.push(session)
    piece.totalPracticeMinutes += session.durationInMinutes

    return await piece.save()
}

// TODO test this
const updatePiece =
    (Piece, UserService) => async (userId, pieceId, pieceDetails) => {
        if (!userId) throw new Error("User not provided.")

        const user = await UserService.getUserById(userId)
        if (!user) throw new Error("User not found.")

        const piece = user.pieces.id(pieceId)
        piece.set({ ...pieceDetails })
        await piece.save()

        const saved = await user.save()

        return piece
    }

const deletePiece = (Piece, UserService) => async (userId, pieceId) => {
    if (!userId) throw new Error("User not provided.")

    const user = await UserService.getUserById(userId)
    if (!user) throw new Error("User not found.")

    await user.pieces.id(pieceId).remove()
    await user.save()

    return
}

const deleteManyPieces = (Piece, UserService) => async (userId, pieceIds) => {
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

const deleteAllPieces = (Piece, UserService) => async (userId, pieceIds) => {
    if (!userId) throw new Error("User not provided.")

    const user = await UserService.getUserById(userId)
    if (!user) throw new Error("User not found.")

    const pieces = await getPieces(Piece, UserService)(userId)

    let count = pieces.length

    user.pieces = []
    await user.save()
    return count
}

module.exports = (Piece = PieceModel, UserService = userService) => {
    return {
        getPieces: getPieces(Piece, UserService),
        getPieceById: getPieceById(Piece, UserService),
        createPiece: createPiece(Piece, UserService),
        addPracticeToPiece: addPracticeToPiece(Piece, UserService),
        updatePiece: updatePiece(Piece, UserService),
        deletePiece: deletePiece(Piece, UserService),
        deleteManyPieces: deleteManyPieces(Piece, UserService),
        deleteAllPieces: deleteAllPieces(Piece, UserService),
    }
}
