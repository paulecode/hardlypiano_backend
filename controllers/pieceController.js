const pieceService = require('../services/pieceService')();

const getAll = async (req, res) => {
	const userId = req.user._id;
	console.log(req.body);

	try {
		const pieces = await pieceService.getPieces(userId);
		res.status(200).send(pieces);
	} catch (e) {
		res.status(400).send(e.message);
	}
};

const create = async (req, res) => {
	const userId = req.user._id;
	const pieceDetails = req.body;

	try {
		const pieces = await pieceService.createPiece(userId, pieceDetails);
		res.status(200).send(pieces);
	} catch (e) {
		res.status(400).send(e.message);
	}
};

module.exports = { getAll, create };
