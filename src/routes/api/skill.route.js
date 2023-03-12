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
// @route   GET api/skill
// @desc    get all skills
// @access  Private
// @auth    Admin
skillRoutes.get('/', skillController.getSkills);
// @route   DELETE api/skill
// @desc    delete Skill
// @access  Private
// @auth    Admin
skillRoutes.delete('/', skillController.deleteSkills);

module.exports = skillRoutes;
