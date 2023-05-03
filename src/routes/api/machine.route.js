const recommendationController = require('../../controllers/recommendation.controller');
const express = require('express');
const machineRoutes = express.Router();

machineRoutes.get('/recommendation/:freelancerId', recommendationController.getRecommendations);

module.exports = machineRoutes;
