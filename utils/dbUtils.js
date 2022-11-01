const getUri = () => {
<<<<<<< Updated upstream
=======
	// const username = process.env.MONGODB_USERNAME;
	// const password = process.env.MONGODB_PASSWORD;
	// const uri = process.env.MONGODB_URI.replace('USERNAME', username).replace(
	// 	'PASSWORD',
	// 	password
	// );
>>>>>>> Stashed changes
	const uri = process.env.MONGODB_URI;
	return uri;
};

module.exports = { getUri };
