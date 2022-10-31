const express = require('express');
const router = express.Router();
const path = '/users';

const userController = require('../controllers/userController');

const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', userController.getAll);
router.delete('/', userController.deleteAllUsers);

module.exports = { path, router };
