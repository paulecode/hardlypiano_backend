const mongoose = require("mongoose")
const PracticeSession = require("./PracticeSession")

const PieceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    composer: {
        type: String,
        required: true,
    },
    metadata: {
        score: Number,
        keySignature: String,
        timeSignature: String,
        difficulty: Number,
    },
    priority: Number,
    practiceSessions: [PracticeSession.schema],
    totalPracticeMinutes: Number,
})

const Piece = new mongoose.model("Piece", PieceSchema)

module.exports = Piece
