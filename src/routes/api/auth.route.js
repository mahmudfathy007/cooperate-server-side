const express = require('express');
const authController = require('../../controllers/auth.controller');
const { authenticate } = require('../../middlewares/authentication');
const authRoutes = express.Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/authenticate', authController.authenticate);
authRoutes.post('/logout', authenticate, authController.logout);
authRoutes.post('/refresh-token', authController.refreshToken);

module.exports = authRoutes;
