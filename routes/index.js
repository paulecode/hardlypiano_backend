const express = require('express');
const router = express.Router();
const path = '/';

router.get('/', async (req, res) => {
	res.send('Hello, world');
});

module.exports = { path, router };
