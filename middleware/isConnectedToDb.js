const db = require("../db")
const isConnectedToDb = (res, req, next) => {
    // if (!db.connected()) {
    //     const message = "Internal server error. Not connected to database"
    //     const err = new Error(message)
    //     err.statusCode = 500
    //     throw err
    // }
    res.send(
        "Process: " +
            process.env.NODE_PROCESS +
            "\nURL: " +
            process.env.MONGODB_PROD_URI
    )
    next()
}
module.exports = isConnectedToDb
