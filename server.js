// env variables
require("dotenv").config()
const PORT = process.env.PORT || 3000
const database = require("./db")
const app = require("./app.js")

database.connect()
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error)
    console.error("Stack:", error.stack)
    process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason)
    process.exit(1)
})
