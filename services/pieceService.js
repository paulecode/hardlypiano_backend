const PieceModel = require('../models/Piece.js');
const userService = require('./userService')();

const getPieces = (Piece, UserService) => async (userId) => {
	if (!userId) throw new Error('User not provided.');

	const user = await UserService.getUserById(userId);
	if (!user) throw new Error('User not found.');

	return user.pieces;
};

const createPiece = (Piece, UserService) => async (userId, pieceDetails) => {
	if (!userId) throw new Error('User not provided.');

	const user = await UserService.getUserById(userId);
	if (!user) throw new Error('User not found.');

	const piece = new Piece(pieceDetails);
	await piece.save();
	await UserService.addPiece(userId, piece);

	return piece;
};

const getPieceById = (Piece, UserService) => async (userId, pieceId) => {
	if (!userId) throw new Error('User ID not provided.');
	if (!pieceId) throw new Error('Piece ID not provided.');

	const user = await UserService.getUserById(userId);
	if (!user) throw new Error('User not found.');

	const piece = user.pieces.id(pieceId);
	if (!piece) throw new Error('Piece not found.');

	return piece;
};

const addPracticeToPiece = (Piece) => async (piece, session) => {
	piece.practiceSessions.push(session);
	piece.totalPracticeMinutes += session.durationInMinutes;

	return await piece.save();
};

module.exports = (Piece = PieceModel, UserService = userService) => {
	return {
		getPieces: getPieces(Piece, UserService),
		getPieceById: getPieceById(Piece, UserService),
		createPiece: createPiece(Piece, UserService),
		addPracticeToPiece: addPracticeToPiece(Piece, UserService),
	};
};
