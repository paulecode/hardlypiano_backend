const userModel = require('../models/User');
const userService = require('../services/userService')(userModel);

async function getUsers(req, res) {
	const result = await userService.getUsers();
	console.log(result);
	res.send(result);
}

async function deleteAllUsers(req, res) {
	const deleted = await userService.deleteAll();
	res.send(`deleted ${deleted.deletedCount} users`);
}

module.exports = { getUsers, deleteAllUsers };
