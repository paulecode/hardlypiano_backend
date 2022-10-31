const pieceService = require('../services/pieceService')();

const getAll = async (req, res) => {
	const userId = req.user._id;
	console.log(req.body);

	try {
		const pieces = await pieceService.getPieces(userId);
		return res.status(200).send(pieces);
	} catch (e) {
		res.status(400).send(e.message);
	}
};

const create = async (req, res) => {
	const userId = req.user._id;
	const pieceDetails = req.body;

	try {
		const pieces = await pieceService.createPiece(userId, pieceDetails);
		return res.status(200).send(pieces);
	} catch (e) {
		res.status(400).send(e.message);
	}
};

const get = async (req, res) => {
	const userId = req.user._id;
	const pieceId = req.params.id;

	try {
		const piece = await pieceService.getPieceById(userId, pieceId);
		return res.status(200).send(piece);
	} catch (e) {
		res.status(400).send(e.message);
	}
};

module.exports = { getAll, create, get };
