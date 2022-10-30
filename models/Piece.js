const mongoose = require('mongoose');
const collection = 'users.pieces';

const PracticeSession = require('./PracticeSession');

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
});

const Piece = new mongoose.Schema('Piece', PieceSchema);

module.exports = Piece;
