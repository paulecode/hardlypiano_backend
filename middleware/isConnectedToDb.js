const db = require("../db")
const isConnectedToDb = (res, req, next) => {
    if (!db.connected()) {
        const message = "Internal server error. Not connected to database"
        const err = new Error(message)
        err.statusCode = 500
        throw err
    }
    next()
}
module.exports = isConnectedToDb
