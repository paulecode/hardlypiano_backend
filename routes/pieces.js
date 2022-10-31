const express = require('express');
const router = express.Router();
const path = '/pieces';

const pieceController = require('../controllers/pieceController');
const practiceController = require('../controllers/practiceController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, pieceController.getAll);
router.get('/:id', isAuthenticated, pieceController.get);
router.post('/:pieceId/practice', isAuthenticated, practiceController.create);
router.post('/', isAuthenticated, pieceController.create);

module.exports = { path, router };
