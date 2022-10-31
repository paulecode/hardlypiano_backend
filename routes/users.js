const express = require('express');
const router = express.Router();
const path = '/users';

const userController = require('../controllers/userController');

const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, userController.get);
router.delete('/', isAuthenticated, userController.deleteAllUsers);
router.get('/all', userController.getAll);

module.exports = { path, router };
