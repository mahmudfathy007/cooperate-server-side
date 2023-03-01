const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const skillController = require('../../controllers/skill.controller');

const skillRoutes = express.Router();

skillRoutes.post('/addSkill', authenticate, authorization('admin'), skillController.addSkill);

module.exports = skillRoutes;
