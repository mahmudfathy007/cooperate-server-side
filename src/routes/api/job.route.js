const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const jobController = require('../../controllers/job.controller');

const jobRoutes = express.Router();

jobRoutes.post('/:userId', jobController.postJob);

jobRoutes.get('/', jobController.getJobs);

jobRoutes.get('/:jobId', jobController.getJob);

jobRoutes.delete('/:userId', jobController.deleteJob);

jobRoutes.patch('/:userId', jobController.updateJob);

module.exports = jobRoutes;
