const express = require('express');
const router = express.Router();
const path = '/';

router.get('/', async (req, res) => {
	res.send('hello world');
});

module.exports = { path, router };
