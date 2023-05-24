const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const chatController = require('../../controllers/chat.controller');

const chatRoutes = express.Router();

// Get all messages for a conversation
// @route   GET api/chat/:conversationId
// @desc    Get all messages for a conversation
// @access  Private
chatRoutes.get('/:conversationId', authenticate, chatController.getAllMessages);

module.exports = chatRoutes;
