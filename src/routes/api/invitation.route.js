const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const invitationController = require('../../controllers/invitation.controller');

const invitationRoutes = express.Router();

// Send Invitation route
// @route   POST api/invitation/:userId
// @desc    Send an invitation to a freelancer
// @access  Private
// @auth    Freelancer
invitationRoutes.post('/:userId', authenticate, authorization('client'), invitationController.sendInvitation);

// Get Invitations route
// @route   GET api/invitation/:userId
// @desc    Get invitations for a user
// @access  Public
invitationRoutes.get('/:userId', authenticate, invitationController.getInvitations);

module.exports = invitationRoutes;
