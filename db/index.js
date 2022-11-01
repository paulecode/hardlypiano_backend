const env = process.env.NODE_ENV;
console.log(env);
const db = require(`./${env}-db`);

module.exports = db;
