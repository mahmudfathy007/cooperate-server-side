const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const categoryController = require('../../controllers/category.controller');

const categoryRoutes = express.Router();

// Add Category route
// @route   POST api/category
// @desc    Add Category
// @access  Private
// @auth    Admin
categoryRoutes.post('/', authenticate, authorization('admin'), categoryController.addCategory);

// Get all Categories route
// @route   GET api/category
// @desc    Get all Categories
categoryRoutes.get('/', authenticate, categoryController.getCategories);

module.exports = categoryRoutes;
