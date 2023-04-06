const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const favoriteController = require('../../controllers/favorite.controller');

const favoriteRoutes = express.Router();

favoriteRoutes.post('/:userId', favoriteController.addFreelancerToFavorite);

favoriteRoutes.post('/:userId', favoriteController.addJobToFavorite);

module.exports = favoriteRoutes;
