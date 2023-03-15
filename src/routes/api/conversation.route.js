const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const conversationController = require('../../controllers/conversation.controller');

const conversationRoutes = express.Router();

conversationRoutes.post('/', conversationController.createConversation);

conversationRoutes.get('/:userId', conversationController.getAllConversations);

module.exports = conversationRoutes;
