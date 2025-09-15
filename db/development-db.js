const mongoose = require("mongoose")
const { getDevelopmentUri } = require("../utils/dbUtils")

const connect = async () => {
    const uri = getDevelopmentUri()
    await mongoose
        .connect(uri, {
            autoCreate: false,
            autoIndex: false,
            bufferCommands: false,
        })
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
