const express = require('express');
const router = express.Router();
const path = '/';

router.get('/', async (req, res) => {
	console.log('GOT HERE');
	res.send('hello world');
});

module.exports = { path, router };
