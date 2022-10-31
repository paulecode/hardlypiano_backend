const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('Access denied. No token provided.');

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.userId = verified;
		next();
	} catch (e) {
		res.status(400).send('Access denied. Invalid token.');
	}
};

module.exports = isAuthenticated;
