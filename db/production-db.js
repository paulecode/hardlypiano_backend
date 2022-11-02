const mongoose = require("mongoose")
const { getProductionUri } = require("../utils/dbUtils")

const connect = async (givenUri) => {
    const uri = givenUri || getProductionUri()
    console.log(givenUri)
    const num = await mongoose
        .connect(uri)
        .then(() => {
            return
        })
        .catch((e) => {
            console.log(e)
        })
    return num
}

const close = async () => {
    await mongoose.connection.close()
}

const clear = async () => {
    return
}

module.exports = { connect, close, clear }
