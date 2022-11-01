let mongod;
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connect = async () => {
	mongod = await MongoMemoryServer.create();
	const uri = mongod.getUri();
	await mongoose.connect(uri);
};

const close = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongod.stop();
};

const clear = async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany();
		// await mongoose.connection.dropCollection(key);
		// await mongod.dropCollection(key);
	}
	// await mongoose.connection.dropDatabase();
	// console.log(Object.keys(mongoose.connection.collections));
	// console.log(key);
};

module.exports = { connect, close, clear };
