const fs = require('fs');

// Import middleware from "/middleware" directory
function importMiddleware(app) {
	const middlewares = fs.readdirSync('./middleware');
	middlewares.forEach((filename) => {
		const middleware = require(`../middleware/${filename}`);
		app.use(middleware);
	});
}

// Import routes from "/routes" directory
function importRoutes(app) {
	const routes = fs.readdirSync('./routes');
	routes.forEach((route) => {
		const { path, router } = require(`../routes/${route}`);
		app.use(path, router);
	});
}

module.exports = { importMiddleware, importRoutes };
