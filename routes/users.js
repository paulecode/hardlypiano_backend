const express = require('express');
const router = express.Router();
const path = '/users';
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

module.exports = { path, router };
