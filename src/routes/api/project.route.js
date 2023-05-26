const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const projectController = require('../../controllers/project.controller');
const { handleFileUpload, uploadProject } = require('../../middlewares/multer');

const projectRoutes = express.Router();

// Create Project route
// @route   POST api/project
// @desc    Accept a proposal and turn it into a project
// @access  Private
// @auth    Client
projectRoutes.post('/', authenticate, authorization('client'), projectController.createProject);

// Get User Projects route
// @route   GET api/project/:userId
// @desc    Get projects for a user
// @access  Public
projectRoutes.get('/:userId', projectController.getProjects);

// Get Project route
// @route   GET api/project
// @desc    Get a project
// @access  Public
projectRoutes.get('/', projectController.getProject);

// Mark Project as Complete route
// @route   PUT api/project/:userId
// @desc    Mark a project as complete
// @access  Private
projectRoutes.put('/:userId', authenticate, authorization('client'), projectController.markAsComplete);

// Upload Project route
// @route   PUT api/project/:projectId/uploadProject
// @desc    Upload a project file
// @access  Private
projectRoutes.put(
  '/:projectId/uploadProject',
  authenticate,
  authorization('freelancer'),
  handleFileUpload(uploadProject),
  projectController.uploadProject
);

module.exports = projectRoutes;
