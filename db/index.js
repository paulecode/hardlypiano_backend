const env = process.env.NODE_ENV // 'test', 'development', 'production'
const db = require(`./${env}-db`)

const mongoose = require("mongoose")
mongoose.connection.on("open", () => {
    console.log("connected to database")
})
mongoose.connection.on("error", (e) => {
    console.log("couldn't establish connection")
})
mongoose.connection.on("close", () => {
    console.log("successfully closed connection")
})

module.exports = db
