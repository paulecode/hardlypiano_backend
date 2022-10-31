const express = require('express');
const router = express.Router();
const path = '/test';

router.post('/', (req, res) => res.send('Hello, world'));

module.exports = { path, router };
