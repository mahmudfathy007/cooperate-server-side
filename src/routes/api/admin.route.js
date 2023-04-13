const express = require('express');
const adminController = require('../../controllers/admin.controller');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');

const adminRoutes = express.Router();

adminRoutes.get('/:userId', adminController.adminDashBoard);

adminRoutes.delete('/:userId/deleteUser', adminController.deleteUser);

module.exports = adminRoutes;
