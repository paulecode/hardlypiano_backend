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
	await mongoose.modelNames().forEach(async (model) => {
		console.log('HERE IT IS', model);
		await mongoose.models[model].collection.drop();
	});
};

module.exports = { connect, close, clear };
