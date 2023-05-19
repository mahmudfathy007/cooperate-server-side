const express = require('express');
const userController = require('../../controllers/user.controller');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const { handleFileUpload, uploadImage, uploadCV } = require('../../middlewares/multer');

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
// @route   PATCH api/user
// @desc    update single user
// @access  Private
userRoutes.patch('/:userId', userController.updateUser);
// @route   PUT api/user/:userId/updateSkills
// @desc    update usre skills
// @access  Private
// @auth    Freelancer
userRoutes.put('/:userId/updateSkills', userController.updateSkills);
// @route   PUT api/user/:userId/updateCategories
// @desc    update usre categories
// @access  Private
// @auth    Freelancer
userRoutes.put('/:userId/updateCategories', userController.updateCategory);

userRoutes.put('/:userId/profilePic', handleFileUpload(uploadImage), userController.profilePic);

userRoutes.put('/:userId/cv', handleFileUpload(uploadCV), userController.cv);

userRoutes.delete('/:userId/deleteAccount', userController.deleteAccount);

userRoutes.put('/:userId/createID', handleFileUpload(uploadImage), userController.createID);

userRoutes.put('/:userId/personalProjects', userController.addPersonalProject);

userRoutes.delete('/:userId/personalProjects', userController.removePersonalProject);

userRoutes.get('/:userId/getWorkHistory', userController.getWorkHistory);

userRoutes.get('/:userId/getFreelancers', userController.getFreelancers);

module.exports = userRoutes;
