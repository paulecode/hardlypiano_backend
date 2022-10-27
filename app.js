const express = require('express');
const app = express();

// Application-level middleware
app.use(express.json()); // parses JSON, makes "req.body" available

// Custom middleware and routing
const appUtils = require('./utils/appUtils');
appUtils.importMiddleware(app);
appUtils.importRoutes(app);

// basic API call
app.get('/', (req, res) => {
	res.send({ message: 'Hello, world' });
});

// export
module.exports = app;
