const mongoose = require('mongoose');
const { getUri } = require('./utils/dbUtils');

async function connect() {
	const uri = getUri();
	await mongoose
		.connect(uri)
		.then(() => {
			return;
		})
		.catch((e) => console.log(e));
}

async function close() {
	await mongoose.connection.close();
}

mongoose.connection.on('open', () => {
	console.log('connected to database');
});
mongoose.connection.on('error', (e) => {
	console.log("couldn't establish connection");
});
mongoose.connection.on('close', () => {
	console.log('successfully closed connection');
});

module.exports = { connect, close, clear };
