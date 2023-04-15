const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const reportController = require('../../controllers/report.controller');

const reportRoutes = express.Router();

reportRoutes.post('/:userId', reportController.postReport);

module.exports = reportRoutes;
