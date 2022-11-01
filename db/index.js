const env = process.env.NODE_ENV;
const db = require(`./${env}-db`);

module.exports = db;
