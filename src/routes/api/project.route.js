const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const projectController = require('../../controllers/project.controller');

const projectRoutes = express.Router();

projectRoutes.post('/', projectController.createProject);

module.exports = projectRoutes;
