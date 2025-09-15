const mongoose = require("mongoose")
const { getProductionUri } = require("../utils/dbUtils")

const connect = async () => {
    const uri = getProductionUri()
    return await mongoose
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
