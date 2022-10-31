const express = require('express');
const app = express();
const appUtils = require('./utils/appUtils');

// Application-level middleware
app.use(express.json()); // parses JSON, makes "req.body" available
const logRequestMiddleware = require('./middleware/logRequest');
app.use(logRequestMiddleware);
// appUtils.importMiddleware(app);

// Routing
appUtils.importRoutes2(app);

// export
module.exports = app;
