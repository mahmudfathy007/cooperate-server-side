const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const jobController = require('../../controllers/job.controller');

const jobRoutes = express.Router();

jobRoutes.post('/:userId', jobController.postJob);

module.exports = jobRoutes;
