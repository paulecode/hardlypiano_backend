const db = require("../db")
const isConnectedToDb = (res, req, next) => {
    if (!db.connected())
        res.status(500).send(
            "Internal server error. Not connected to database."
        )
    next()
}
module.exports = isConnectedToDb
