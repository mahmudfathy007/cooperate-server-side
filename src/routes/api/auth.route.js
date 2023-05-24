const express = require('express');
const authController = require('../../controllers/auth.controller');
const { authenticate } = require('../../middlewares/authentication');
const authRoutes = express.Router();

// Registration route
// @route   POST api/register
// @desc    Registration
// @access  Public
authRoutes.post('/register', authController.register);

// Authentication route
// @route   POST api/authenticate
// @desc    Authentication
// @access  Public
authRoutes.post('/authenticate', authController.authenticate);

// Logout route
// @route   DELETE api/logout
// @desc    LogOut
// @access  Private
authRoutes.delete('/logout', authenticate, authController.logout);

// Refresh Token route
// @route   POST api/refresh-token
// @desc    Get new access token
// @access  Public
authRoutes.post('/refresh-token', authController.refreshToken);

// Confirm Email route
// @route   GET api/confirmEmail/:token
// @desc    Confirm Email
// @access  Public
authRoutes.get('/confirmEmail/:token', authController.confrimEmail);

module.exports = authRoutes;
