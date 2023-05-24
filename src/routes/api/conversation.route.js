const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const conversationController = require('../../controllers/conversation.controller');

const conversationRoutes = express.Router();

// Create Conversation route
// @route   POST api/conversation
// @desc    Create a new conversation
// @access  Private
conversationRoutes.post('/', authenticate, conversationController.createConversation);

// Get All Conversations route
// @route   GET api/conversation/:userId
// @desc    Get all conversations for a user
// @access  Public
conversationRoutes.get('/:userId', authenticate, conversationController.getAllConversations);

module.exports = conversationRoutes;
