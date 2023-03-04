const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const categoryController = require('../../controllers/category.controller');

const categoryRoutes = express.Router();

categoryRoutes.post('/', categoryController.addCategory);

categoryRoutes.get('/', categoryController.getCategories);

module.exports = categoryRoutes;
