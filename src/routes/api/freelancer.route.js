const express = require('express');
const freelancerController = require('../../controllers/freelancer.controller');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');

const freelancerRoutes = express.Router();

// Get Freelancers route
// @route   GET api/freelancer
// @desc    Get all freelancers
// @access  Public
freelancerRoutes.get('/', freelancerController.getFreelancers);

module.exports = freelancerRoutes;
