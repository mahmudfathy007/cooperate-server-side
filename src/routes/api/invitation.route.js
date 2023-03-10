const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const invitationController = require('../../controllers/invitation.controller');

const invitationRoutes = express.Router();

invitationRoutes.post('/:userId', invitationController.sendIvitation);

module.exports = invitationRoutes;
