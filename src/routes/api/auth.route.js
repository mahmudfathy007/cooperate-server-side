const express = require('express');
const authController = require('../../controllers/auth.controller');
const { authenticate } = require('../../middlewares/authentication');
const authRoutes = express.Router();

// @route   POST api/register
// @desc    Registration
// @access  Public
authRoutes.post('/register', authController.register);
// @route   POST api/authenticate
// @desc    Authentication
// @access  Public
authRoutes.post('/authenticate', authController.authenticate);
// @route   DELETE api/logout
// @desc    LogOut
// @access  Private
authRoutes.delete('/logout', authenticate, authController.logout);
// @route   POST api/refresh-token
// @desc    Get new access token
// @access  Public
authRoutes.post('/refresh-token', authController.refreshToken);

authRoutes.get('confrimEmail/:token', authController.confrimEmail);

module.exports = authRoutes;
