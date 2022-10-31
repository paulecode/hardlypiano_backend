const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userModel = require('../models/User');
const userService = require('../services/userService')(userModel);

async function register(req, res) {
	const { username, password } = req.body;

	if (!username || !password)
		return res.status(400).send('Bad request. Missing fields');

	const foundUser = await userService.findOne({ username });
	if (foundUser) {
		return res.status(409).send('Bad request. Username already in use.');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		const user = await userService.createUser({
			username: username,
			password: hashedPassword,
		});
		res.status(201).send({ message: 'user successfully registered', user });
	} catch (e) {
		res.status(400).send(e.message);
	}
}

async function login(req, res) {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).send('Bad request. Missing fields');

	const user = await userService.findOne({ username });
	if (!user) return res.status(409).send('Username not found.');

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) return res.status(400).send('Invalid password.');

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	return res.header('auth-token', token).send({ id: user._id, token });
}

module.exports = { register, login };
