const mongoose = require('mongoose');
const collection = 'users';

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
});

const User = mongoose.model('User', UserSchema, collection);

module.exports = User;
