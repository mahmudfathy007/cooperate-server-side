const express = require('express');
const adminController = require('../../controllers/admin.controller');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');

const adminRoutes = express.Router();

// Admin Dashboard route
// @route   GET api/admin
// @desc    Admin Dashboard
// @access  Private
adminRoutes.get('/', authenticate, authorization('admin'), adminController.adminDashBoard);

// Delete User route
// @route   DELETE api/admin/deleteUser
// @desc    Delete User
// @access  Private
adminRoutes.delete('/deleteUser', authenticate, authorization('admin'), adminController.deleteUser);

module.exports = adminRoutes;
