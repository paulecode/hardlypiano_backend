const getUri = () => {
	const uri = process.env.MONGODB_URI;
	return uri;
};

module.exports = { getUri };
