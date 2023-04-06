const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const favoriteController = require('../../controllers/favorite.controller');

const favoriteRoutes = express.Router();

favoriteRoutes.post('/:userId/addFreelancerToFavorite', favoriteController.addFreelancerToFavorite);

favoriteRoutes.post('/:userId/addJobToFavorite', favoriteController.addJobToFavorite);

favoriteRoutes.delete('/:favoriteId', favoriteController.deleteFavorite);

module.exports = favoriteRoutes;
