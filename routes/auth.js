const express = require('express');
const router = express.Router();
const path = '/auth';

const authController = require('../controllers/authController');

router.get('/register', authController.register);

module.exports = { path, router };
