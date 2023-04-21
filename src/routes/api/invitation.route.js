const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const invitationController = require('../../controllers/invitation.controller');

const invitationRoutes = express.Router();

// @route   POST api/invitation/:userId
// @desc    send invitation to freelancer
// @access  Private
// @auth    Freelancer
invitationRoutes.post('/:userId', invitationController.sendInvitation);

invitationRoutes.get('/:userId', invitationController.getInvitations);

module.exports = invitationRoutes;
