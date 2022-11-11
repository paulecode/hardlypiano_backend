function logRequestMiddleware(req, res, next) {
    if (process.env.NODE_ENV === "develop") {
        console.log(`${new Date().toLocaleString()}: ${req.method} ${req.url}`)
        if (Object.keys(req.body).length > 0) console.log(req.body)
    }
    next()
}

module.exports = logRequestMiddleware
