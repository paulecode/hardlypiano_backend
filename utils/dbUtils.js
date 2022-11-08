module.exports.getUri = () => {
    const uri = process.env.MONGODB_URI
    return uri
}

module.exports.getProductionUri = () => {
    const uri = process.env.MONGODB_PROD_URI
    return uri
}
