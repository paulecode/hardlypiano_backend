const db = require("../db")
const isConnectedToDb = (req, res, next) => {
    // if (!db.connected()) {
    //     const message = "Internal server error. Not connected to database"
    //     const err = new Error(message)
    //     err.statusCode = 500
    //     throw err
    // }
    res.json(
        "Process: " +
            process.env.NODE_ENV +
            "\nURL: " +
            process.env.MONGODB_PROD_URI
    )
    next()
}
module.exports = isConnectedToDb
