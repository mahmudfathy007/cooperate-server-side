const express = require('express');
const userController = require('../../controllers/user.controller');
const { authenticate } = require('../../middlewares/authentication');

const userRoutes = express.Router();

// @route   PUT api/user/change-password
// @desc    Change user password
// @access  Private
userRoutes.put('/change-password', authenticate, userController.changePassword);

// @route   GET api/user/:userId
// @desc    get single User info
// @access  Private
userRoutes.get('/:userId', authenticate, userController.getUser);

userRoutes.patch('/:userId', authenticate, userController.updateUser);


module.exports = userRoutes;
