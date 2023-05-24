const recommendationController = require('../../controllers/recommendation.controller');
const sentimentController = require('../../controllers/sentiment.controller');
const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const machineRoutes = express.Router();

// Get recommendations for a freelancer
// @route   GET api/machine/recommendation/:freelancerId
// @desc    Get recommendations for a freelancer
// @access  Private
// @auth    Freelancer
machineRoutes.get(
  '/recommendation/:freelancerId',
  authenticate,
  authorization('freelancer'),
  recommendationController.getRecommendations
);

// Get sentiment analysis
// @route   GET api/machine/sentiment
// @desc    Get sentiment analysis
// @access  Private
// @auth    Admin
machineRoutes.get('/sentiment', authenticate, authorization('admin'), sentimentController.getSentiment);

module.exports = machineRoutes;
