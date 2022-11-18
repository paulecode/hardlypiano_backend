const mongoose = require("mongoose")

const PracticeSessionSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    durationInMinutes: Number,
    score: Number,
})

const PracticeSession = new mongoose.model(
    "PracticeSession",
    PracticeSessionSchema
)

module.exports = PracticeSession
