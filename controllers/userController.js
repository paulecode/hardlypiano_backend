const userService = require('../services/userService');

async function getUsers(req, res) {
	const result = await userService.get();
	console.log(result);
	res.send(result);
}

module.exports = { getUsers };
