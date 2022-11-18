const mongoose = require("mongoose")

const PracticeSessionSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
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
