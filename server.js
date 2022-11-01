// env variables
console.log(process)
const PORT = process.env.PORT || 3000
const database = require("./database.js")
const app = require("./app.js")

database.connect()
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
