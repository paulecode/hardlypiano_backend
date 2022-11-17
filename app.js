// Dependencies
const express = require("express")
const app = express()
const appUtils = require("./utils/appUtils")
const isConnectedToDb = require("./middleware/isConnectedToDb")
const logRequestMiddleware = require("./middleware/logRequest")
const errorMiddleware = require("./middleware/errorMiddleware")
const toobusy = require("toobusy-js")
const hpp = require("hpp")

// Security
app.use((res, req, next) => {
    if (toobusy()) res.send(503, "Server too busy")
    else next()
})

// Application-level middleware
app.use(express.urlencoded({ extended: true })) // parses JSON, makes "req.body" available
app.use(hpp()) // Defends against query pollution

app.use(express.json()) // parses JSON, makes "req.body" available

// Custom middleware
app.use(logRequestMiddleware)
app.use(isConnectedToDb)

// Routing
appUtils.importRoutes(app)

// Error handling
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.log)
app.use(errorMiddleware.sendError)

// export
module.exports = app
