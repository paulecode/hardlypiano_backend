const mongoose = require('mongoose');

const PracticeSessionSchema = new mongoose.Schema({
	startTime: {
		type: Date,
		required: true,
	},
	endTime: {
		type: Date,
		required: true,
	},
	score: Number,
	type: String,
});

const PracticeSession = new mongoose.Schema('PracticeSession', PieceSchema);

module.exports = PracticeSession;
