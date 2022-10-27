const UserModel = require('../models/User.js');

async function get() {
	// const result = await UserModel.find();
	console.log('got here too');
	const result = await 'hello';
	return result;
}

module.exports = { get };
