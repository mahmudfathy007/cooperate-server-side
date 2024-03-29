const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const jobController = require('../../controllers/job.controller');

const jobRoutes = express.Router();
// @route   POST api/job/:userId
// @desc    post a job
// @access  Private
// @auth    Client
jobRoutes.post('/:userId', authenticate, authorization('client'), jobController.postJob);
// @route   GET api/job
// @desc    get all jobs posted by client
// @access  Public
jobRoutes.get('/', jobController.getJobs);
// @route   GET api/job/:jobId
// @desc    get single job details
// @access  Public
jobRoutes.get('/:jobId', jobController.getJob);
// @route   DELETE api/job/:userId
// @desc    delete job
// @access  Private
// @auth    Client
jobRoutes.delete('/:userId', authenticate, authorization('client'), jobController.deleteJob);
// @route   PATCH api/job/:userId
// @desc    update job details
// @access  Private
// @auth    Client
jobRoutes.patch('/:userId', authenticate, authorization('client'), jobController.updateJob);

module.exports = jobRoutes;
