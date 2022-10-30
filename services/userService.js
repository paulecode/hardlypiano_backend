const UserModel = require('../models/User.js');

const getUsers = (User) => () => {
	return User.find({});
};

const getUserById = (User) => (userId) => {
	if (!userId) throw new Error('No userId provided.');

	return User.findById(userId);
};

const createUser = (User) => (username, password) => {
	if (!username || !password) {
		console.log('ayyy');
		throw new Error('username or password not provided');
		return;
	}

	if (User.find({ username })) {
		console.log('nooo');
		throw new Error('username already taken');
		return;
	}

	const user = new User({ username, password });
	return user.save();
};

module.exports = (User) => {
	return {
		getUserById: getUserById(User),
		getUsers: getUsers(User),
		createUser: createUser(User),
	};
};
