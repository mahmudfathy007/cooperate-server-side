const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const categoryController = require('../../controllers/category.controller');

const categoryRoutes = express.Router();

// @route   POST api/category
// @desc    add Category
// @access  Private
// @auth    Admin
categoryRoutes.post('/', categoryController.addCategory);
// @route   GET api/category
// @desc    get all Category
// @access  Private
// @auth    Admin
categoryRoutes.get('/', categoryController.getCategories);

module.exports = categoryRoutes;
