module.exports.getUri = () => {
    const uri = process.env.MONGODB_URI
    console.log("HELLLOOOO", uri)
    return uri
}

module.exports.getProductionUri = () => {
    const uri = process.env.MONGODB_PROD_URI
    console.log("HELLLOOOO", uri)
    return uri
}
