const express = require('express');
const router = express.Router();
const path = '/pieces';

const pieceController = require('../controllers/pieceController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, pieceController.getAll);
router.post('/', isAuthenticated, pieceController.create);

module.exports = { path, router };
