const UserModel = require('../models/User.js');

const getUsers = (User) => () => {
	console.log('userService.getUsers called');
	return User.find({});
};

const getUserById = (User) => (userId) => {
	if (!userId) throw new Error('No userId provided.');

	return User.findById(userId);
};

const createUser = (User) => async (username, password) => {
	if (!username || !password) {
		console.log('ayyy');
		throw new Error('username or password not provided');
		return;
	}

	if (await User.findOne({ username }))
		throw new Error('username already taken');

	const user = new User({ username, password });
	return user.save();
};

const deleteAll = (User) => (username, password) => {
	return User.deleteMany({});
};

module.exports = (User) => {
	return {
		getUserById: getUserById(User),
		getUsers: getUsers(User),
		createUser: createUser(User),
		deleteAll: deleteAll(User),
	};
};
