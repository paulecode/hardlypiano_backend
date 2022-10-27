const mongoose = require('mongoose');
const { getUri } = require('./utils/dbUtils');

mongoose.connection.on('open', () => {
	console.log('connected to database');
});
mongoose.connection.on('error', (e) => {
	console.log("couldn't establish connection");
});

async function connect() {
	const uri = getUri();
	mongoose.connect(uri).catch((e) => console.log(e));
	return;
}

async function close() {
	mongoose.connection.close();
	return;
}

module.exports = { connect, close };
