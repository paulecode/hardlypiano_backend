const errorMiddleware = {}

errorMiddleware.log = (err, req, res, next) => {
    console.log(err.statusCode, err.message || "Error not specified.")
    next(err)
}

errorMiddleware.sendError = (err, req, res, next) => {
    const statusCode = err.statusCode || 400
    const message = err.message || "Error not specified."
    const errorResponse = {
        message,
    }
    res.status(statusCode).send(errorResponse)
}

module.exports = errorMiddleware
