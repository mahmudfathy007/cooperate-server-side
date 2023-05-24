const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const ratingController = require('../../controllers/rating.controller');

const ratingRoutes = express.Router();

// Post Rating route
// @route   POST api/rating/:userId
// @desc    Post a rating for a user
// @access  Private
ratingRoutes.post('/:userId', authenticate, ratingController.postRate);

// Get Ratings for a User route
// @route   GET api/rating/:userId
// @desc    Get ratings for a user
// @access  Public
ratingRoutes.get('/:userId', authenticate, ratingController.getRatings);

// Get All Ratings for Admin route
// @route   GET api/rating
// @desc    Get all ratings for admin
// @access  Private
// @auth    Admin
ratingRoutes.get('/', authenticate, authorization('admin'), ratingController.getAllRatingsForAdmin);

module.exports = ratingRoutes;
