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
	const routes = fs.readdirSync(`./${root}/${subdirectory}`, {
		withFileTypes: true,
	});
	routes.forEach((route) => {
		const dashes = '-'.repeat(level * 2);
		console.log(dashes, route.name);
		if (route.isDirectory()) {
			return importRoutes3(app, route.name, level + 1);
		}

		const {
			path,
			router,
		} = require(`../${root}/${subdirectory}/${route.name}`);

		const pathName = `${subdirectory}${path}`;
		// console.log(path);
	});
}

module.exports = { importMiddleware, importRoutes2: importRoutes3 };
