const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const favoriteController = require('../../controllers/favorite.controller');

const favoriteRoutes = express.Router();

// Add Freelancer to Favorites route
// @route   POST api/favorite/:userId/addFreelancerToFavorite
// @desc    Add a freelancer to favorites
// @access  Private
favoriteRoutes.post(
  '/:userId/addFreelancerToFavorite',
  authenticate,
  authorization('client'),
  favoriteController.addFreelancerToFavorite
);

// Add Job to Favorites route
// @route   POST api/favorite/:userId/addJobToFavorite
// @desc    Add a job to favorites
// @access  Private
favoriteRoutes.post(
  '/:userId/addJobToFavorite',
  authenticate,
  authorization('freelancer'),
  favoriteController.addJobToFavorite
);

// Delete Favorite route
// @route   DELETE api/favorite/:favoriteId
// @desc    Delete a favorite
// @access  Private
favoriteRoutes.delete('/:favoriteId', authenticate, favoriteController.deleteFavorite);

module.exports = favoriteRoutes;
