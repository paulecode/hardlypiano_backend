// env variables
const PORT = process.env.PORT || 3000;
const app = require('./app.js');

const database = require('./database.js');
database.connect();
