const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const milestoneController = require('../../controllers/milestone.controller');

const milestoneRoutes = express.Router();

milestoneRoutes.post('/:projectId', milestoneController.createMilestone);

milestoneRoutes.put('/:milestoneId', milestoneController.updateMilestone);

module.exports = milestoneRoutes;
