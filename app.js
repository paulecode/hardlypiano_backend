const express = require("express")
const app = express()
const appUtils = require("./utils/appUtils")

// Application-level middleware
app.use(express.json()) // parses JSON, makes "req.body" available
const isConnectedToDb = require("./middleware/isConnectedToDb")
const logRequestMiddleware = require("./middleware/logRequest")
app.use(logRequestMiddleware)
app.use(isConnectedToDb)
// appUtils.importMiddleware(app);

// Routing
appUtils.importRoutes(app)

// Error handling
const errorMiddleware = require("./middleware/errorMiddleware")
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.log)
app.use(errorMiddleware.sendError)

// export
module.exports = app
