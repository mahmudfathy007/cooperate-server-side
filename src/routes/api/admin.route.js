const express = require('express');
const adminController = require('../../controllers/admin.controller');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');

const userRoutes = express.Router();

userRoutes.get('/:userId', adminController.adminDashBoard);

module.exports = userRoutes;
