module.exports.getDevelopmentUri = () => {
    const uri = process.env.MONGODB_DEV_URI
    return uri
}

module.exports.getProductionUri = () => {
    const uri = process.env.MONGODB_PROD_URI
    return uri
}
