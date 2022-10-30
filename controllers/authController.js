const userModel = require('../models/User');
const userService = require('../services/userService')(userModel);

async function register(req, res) {
	const { username, password } = req.body;

	try {
		const user = await userService.createUser(username, password);
		res.status(201).send({ message: 'user successfully registered', user });
	} catch (e) {
		res.status(400).send(e.message);
	}
}

module.exports = { register };
