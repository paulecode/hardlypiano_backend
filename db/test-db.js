const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

let connect;
let close;
let clear;

if (process.env.NODE_ENV === 'test') {
	connect = async () => {
		mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();
		await mongoose.connect(uri);
	};

	close = async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
		await mongod.stop();
	};

	clear = async () => {
		const collections = mongoose.connection.collections;
		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany();
		}
	};
}

module.exports = { connect, close, clear };
