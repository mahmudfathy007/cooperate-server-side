const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const skillController = require('../../controllers/skill.controller');

const skillRoutes = express.Router();

// Add Skill route
// @route   POST api/skill
// @desc    Add a skill
// @access  Private
// @auth    Admin
skillRoutes.post('/', authenticate, authorization('admin'), skillController.addSkill);

// Get All Skills route
// @route   GET api/skill
// @desc    Get all skills
// @access  Private
// @auth    Admin
skillRoutes.get('/', authenticate, skillController.getSkills);

// Delete Skill route
// @route   DELETE api/skill
// @desc    Delete a skill
// @access  Private
// @auth    Admin
skillRoutes.delete('/', authenticate, authorization('admin'), skillController.deleteSkills);

module.exports = skillRoutes;
