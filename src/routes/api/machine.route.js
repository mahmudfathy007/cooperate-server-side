const recommendationController = require('../../controllers/recommendation.controller');
const sentimentController = require('../../controllers/sentiment.controller');
const express = require('express');
const machineRoutes = express.Router();

machineRoutes.get('/recommendation/:freelancerId', recommendationController.getRecommendations);
machineRoutes.get('/sentiment', sentimentController.getSentiment);

module.exports = machineRoutes;
