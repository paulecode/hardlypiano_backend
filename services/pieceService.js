const PieceModel = require('../models/Piece.js');
const userService = require('./userService')();

const getPieces = (Piece) => async (userId) => {
	if (!userId) throw new Error('User not provided.');

	const user = await userService.getUserById(userId);
	if (!user) throw new Error('User not found.');

	return user.pieces;
};

const createPiece = (Piece) => async (userId, pieceDetails) => {
	if (!userId) throw new Error('User not provided.');

	const user = await userService.getUserById(userId);
	if (!user) throw new Error('User not found.');

	const piece = new Piece(pieceDetails);
	await piece.save();
	await userService.addPiece(userId, piece);

	return piece;
};

module.exports = (Piece = PieceModel) => {
	return {
		getPieces: getPieces(Piece),
		createPiece: createPiece(Piece),
	};
};
