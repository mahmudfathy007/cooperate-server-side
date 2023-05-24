const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const messageController = require('../../controllers/message.controller');

const messageRoutes = express.Router();

// @route   POST api/message/:userId
// @desc    Send a message to a admin
// @access  Private
// @auth    None
messageRoutes.post('/:userId', authenticate, messageController.sendMessage);

// Get all messages
// @route   GET api/message
// @desc    Get all messages
// @access  Private
// @auth    Admin
messageRoutes.get('/', authenticate, authorization('admin'), messageController.getAllMessages);

// Change the status of a message
// @route   PUT api/message/:messageId
// @desc    Change the status of a message
// @access  Private
// @auth    Admin
messageRoutes.put('/:messageId', authenticate, authorization('admin'), messageController.changeStatus);

module.exports = messageRoutes;
