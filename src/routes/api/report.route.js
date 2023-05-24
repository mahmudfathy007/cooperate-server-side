const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const reportController = require('../../controllers/report.controller');

const reportRoutes = express.Router();

// Post Report route
// @route   POST api/report/:userId
// @desc    Post a report for a user
// @access  Private
reportRoutes.post('/:userId', authenticate, reportController.postReport);

module.exports = reportRoutes;
