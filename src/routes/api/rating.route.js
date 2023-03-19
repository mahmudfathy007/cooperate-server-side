const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const ratingController = require('../../controllers/rating.controller');

const ratingRoutes = express.Router();

ratingRoutes.post('/:userId', ratingController.postRate);

ratingRoutes.get('/:userId', ratingController.getRatings);

module.exports = ratingRoutes;
