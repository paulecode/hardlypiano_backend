const fs = require("fs")

// Import middleware from "/middleware" directory
function importMiddleware(app) {
    const middlewares = fs.readdirSync("./middleware")
    middlewares.forEach((filename) => {
        const middleware = require(`../middleware/${filename}`)
        app.use(middleware)
    })
}

// Import routes recursively from "/routes" directory
function importRoutes(app, subdirectory = "") {
    const root = "routes" // excluded from endpoint routes
    const directory = root + subdirectory
    const routes = fs.readdirSync(directory, {
        withFileTypes: true,
    })
    routes.forEach((route) => {
        if (route.isDirectory()) {
            return importRoutes(app, `${subdirectory}/${route.name}`)
        }
        const { path, router } = require(`../${directory}/${route.name}`)
        app.use(subdirectory + path, router)
    })
}

module.exports = { importMiddleware, importRoutes }
