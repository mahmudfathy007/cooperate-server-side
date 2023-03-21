const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const projectController = require('../../controllers/project.controller');

const projectRoutes = express.Router();

// @route   POST api/project
// @desc    accept a proposal and turn it into a project
// @access  Private
// @auth    Client
projectRoutes.post('/', projectController.createProject);

projectRoutes.get('/:userId', projectController.getProjects);

projectRoutes.put('/:userId', projectController.markAsComplete);

module.exports = projectRoutes;
