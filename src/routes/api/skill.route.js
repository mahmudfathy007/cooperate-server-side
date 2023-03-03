const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const skillController = require('../../controllers/skill.controller');

const skillRoutes = express.Router();

// @route   POST api/skill
// @desc    get all users
// @access  Private
// @auth    Admin
skillRoutes.post('/', skillController.addSkill);

skillRoutes.get('/', skillController.getSkills);

skillRoutes.delete('/', skillController.deleteSkills);

module.exports = skillRoutes;
