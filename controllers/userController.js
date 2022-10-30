const userModel = require('../models/User');
const userService = require('../services/userService')(userModel);

async function getUsers(req, res) {
	const result = await userService.getUsers();
	console.log(result);
	res.send(result);
}

module.exports = { getUsers };
