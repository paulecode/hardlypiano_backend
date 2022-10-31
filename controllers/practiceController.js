const PracticeService = require('../services/practiceSessionService')();

const create = async (req, res) => {
	const userId = req.user._id;
	const pieceId = req.params.pieceId;
	const endTime = new Date();
	const startTime = new Date(endTime.getTime() - 5 * 60 * 1000);
	const practiceDetails = {
		startTime,
		endTime,
	};

	try {
		console.log('got here', practiceDetails, pieceId);
		const session = await PracticeService.addPracticeSession({
			pieceId,
			userId,
			practiceDetails,
		});
		return res.status(200).send(session);
	} catch (e) {
		res.status(400).send(e.message);
	}
};

module.exports = { create };
