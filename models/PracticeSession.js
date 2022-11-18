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
    type: String,
})

const PracticeSession = new mongoose.model(
    "PracticeSession",
    PracticeSessionSchema
)

module.exports = PracticeSession
