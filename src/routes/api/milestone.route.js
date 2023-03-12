const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const milestoneController = require('../../controllers/milestone.controller');

const milestoneRoutes = express.Router();
// @route   POST api/milestone/:projectId
// @desc    create a new milestone
// @access  Private
// @auth    Freelancer
milestoneRoutes.post('/:projectId', milestoneController.createMilestone);
// @route   PUT api/milestone/:milestoneId
// @desc    update milestone
// @access  Private
// @auth    Freelancer
milestoneRoutes.put('/:milestoneId', milestoneController.updateMilestone);

module.exports = milestoneRoutes;
