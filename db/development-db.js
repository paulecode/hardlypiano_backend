const mongoose = require("mongoose")
const { getUri } = require("../utils/dbUtils")

const connect = async () => {
    const uri = getUri()
    await mongoose
        .connect(uri)
        .then(() => {
            return
        })
        .catch((e) => console.log(e))
}

const close = async () => {
    await mongoose.connection.close()
}

const clear = async () => {
    return
}

module.exports = { connect, close, clear }
