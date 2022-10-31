const express = require('express');
const router = express.Router();
const path = '/test';

router.get('/', (req, res) => res.send('It works'));

module.exports = { path, router };
