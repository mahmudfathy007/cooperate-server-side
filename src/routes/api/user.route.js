const express = require('express');
const userController = require('../../controllers/user.controller');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');

const userRoutes = express.Router();

// @route   PUT api/user/change-password
// @desc    Change user password
// @access  Private
userRoutes.put('/change-password', authenticate, userController.changePassword);

// @route   GET api/user/:userId
// @desc    get single User info
// @access  Private
userRoutes.get('/:userId', userController.getUser);

// @route   GET api/user
// @desc    get all users
// @access  Private
// @auth    Admin
userRoutes.get('/', authenticate, authorization('admin'), userController.getUsers);

// @route   GET api/user
// @desc    update single user
// @access  Private
userRoutes.patch('/:userId', userController.updateUser);

userRoutes.put('/:userId/updateSkills', userController.updateSkills);
userRoutes.put('/:userId/updateCategories', userController.updateCategory);

module.exports = userRoutes;
