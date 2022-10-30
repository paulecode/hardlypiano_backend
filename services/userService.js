const UserModel = require('../models/User.js');

const getUsers = (User) => () => {
	return User.find({});
};

const getUserById = (User) => (userId) => {
	if (!userId) throw new Error('No userId provided.');

	return User.findById(userId);
};

module.exports = (User) => {
	return {
		getUserById: getUserById(User),
		getUsers: getUsers(User),
	};
};
