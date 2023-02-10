const express = require('express');
const authController = require('../../controllers/auth.controller');
const authRoutes = express.Router();

authRoutes.post('/register', authController.register);

module.exports = authRoutes;
