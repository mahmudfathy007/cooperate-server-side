const express = require('express');
const userController = require('../../controllers/user.controller');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const { handleFileUpload, uploadImage, uploadCV } = require('../../middlewares/multer');

const userRoutes = express.Router();

// Change User Password route
// @route   PUT api/user/change-password
// @desc    Change user password
// @access  Private
userRoutes.put('/change-password', authenticate, userController.changePassword);

// Get Single User Info route
// @route   GET api/user/:userId
// @desc    Get single User info
// @access  Public
userRoutes.get('/:userId', userController.getUser);

// Get All Users route
// @route   GET api/user
// @desc    Get all users
// @access  Private
// @auth    Admin
userRoutes.get('/', authenticate, authorization('admin'), userController.getUsers);

// Update Single User route
// @route   PATCH api/user/:userId
// @desc    Update single user
// @access  Private
userRoutes.patch('/:userId', authenticate, userController.updateUser);

// Update User Skills route
// @route   PUT api/user/:userId/updateSkills
// @desc    Update user skills
// @access  Private
// @auth    Freelancer
userRoutes.put('/:userId/updateSkills', authenticate, userController.updateSkills);

// Update User Categories route
// @route   PUT api/user/:userId/updateCategories
// @desc    Update user categories
// @access  Private
// @auth    Freelancer
userRoutes.put('/:userId/updateCategories', authenticate, userController.updateCategory);

// Update User Profile Picture route
// @route   PUT api/user/:userId/profilePic
// @desc    Update user profile picture
// @access  Private
userRoutes.put('/:userId/profilePic', authenticate, handleFileUpload(uploadImage), userController.profilePic);

// Update User CV route
// @route   PUT api/user/:userId/cv
// @desc    Update user CV
// @access  Private
userRoutes.put('/:userId/cv', authenticate, handleFileUpload(uploadCV), userController.cv);

// Delete User Account route
// @route   DELETE api/user/:userId/deleteAccount
// @desc    Delete user account
// @access  Private
userRoutes.delete('/:userId/deleteAccount', userController.deleteAccount);

// Update User ID route
// @route   PUT api/user/:userId/createID
// @desc    Update user ID
// @access  Private
userRoutes.put('/:userId/createID', authenticate, handleFileUpload(uploadImage), userController.createID);

// Add Personal Project route
// @route   PUT api/user/:userId/personalProjects
// @desc    Add personal project
// @access  Private
userRoutes.put('/:userId/personalProjects', authenticate, authorization('freelancer'), userController.addPersonalProject);

// Remove Personal Project route
// @route   DELETE api/user/:userId/personalProjects
// @desc    Remove personal project
// @access  Private
userRoutes.delete(
  '/:userId/personalProjects',
  authenticate,
  authorization('freelancer'),
  userController.removePersonalProject
);

// Get User Work History route
// @route   GET api/user/:userId/getWorkHistory
// @desc    Get user work history
// @access  Private
userRoutes.get('/:userId/getWorkHistory', authenticate, userController.getWorkHistory);

module.exports = userRoutes;
