const express = require('express');
const authController = require('../../controllers/auth.controller');
const authRoutes = express.Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/authenticate', authController.authenticate);
authRoutes.post('/logout', authController.logout);
authRoutes.post('/refresh-token', authController.refreshToken);

module.exports = authRoutes;
