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
	const routes = fs.readdirSync('./routes', { withFileTypes: true });
	routes.forEach((route) => {
		console.log(route.isDirectory());
		// const { path, router } = require(`../routes/${route}`);
		// console.log(`Adding path ${path}`);
		// app.use(path, router);
	});
}

function importRoutes2(app, root = 'routes') {
	const routes = fs.readdirSync(`./${root}`, { withFileTypes: true });
	routes.forEach((route) => {
		console.log('CURRENT ROUTE', route);
		if (route.isDirectory()) {
			return importRoutes2(app, `${root}/${route.name}`);
		}
		const routePath = `../${root}/${route.name}`;
		const { path, router } = require(routePath);
		console.log(routePath);
		app.use(path, router);
	});
}

function importRoutes3(app, subdirectory = '', level = 1) {
	const root = 'routes';
	const directory = root + subdirectory;
	const files = fs.readdirSync(directory, {
		withFileTypes: true,
	});
	files.forEach((file) => {
		if (file.isDirectory()) {
			return importRoutes3(app, `${subdirectory}/${file.name}`, level + 1);
		}
		const filePath = root + `${subdirectory}/${file.name}`;
		const { path, router } = require(`../${filePath}`);
		console.log(subdirectory + path);
		app.use(subdirectory + path, router);
	});
}

module.exports = { importMiddleware, importRoutes2: importRoutes3 };
