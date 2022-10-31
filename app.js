const express = require('express');
const app = express();
const appUtils = require('./utils/appUtils');

// Application-level middleware
app.use(express.json()); // parses JSON, makes "req.body" available
appUtils.importMiddleware(app);

// Routing
appUtils.importRoutes(app);

// export
module.exports = app;
