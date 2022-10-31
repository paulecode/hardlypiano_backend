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
	const filepath = root + subdirectory;
	const routes = fs.readdirSync(filepath, {
		withFileTypes: true,
	});
	routes.forEach((route) => {
		// const dashes = '-'.repeat(level * 2);
		console.log(route.name);
		if (route.isDirectory()) {
			const subdirectorypath = subdirectory + '/' + route.name;
			console.log('HELLOOO', subdirectorypath);
			return importRoutes3(app, `${subdirectory}/${route.name}`, level + 1);
		} else {
			const filename = root + subdirectory + route.name;
		}

		require;

<<<<<<< Updated upstream
		const pathName = `${subdirectory}${path}`;
=======
		// const {
		// 	path,
		// 	router,
		// } = require(`../${root}/${subdirectory}/${route.name}`);

		// const pathName = `${subdirectory}${path}`;
>>>>>>> Stashed changes
		// console.log(path);
	});
	// const subdirectory = '/users';
	// const path = '/path';
	// app.use('/users/practice'); // subdirectory + path
}

module.exports = { importMiddleware, importRoutes2: importRoutes3 };
