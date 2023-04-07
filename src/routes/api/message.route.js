const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const messageController = require('../../controllers/message.controller');

const messageRoutes = express.Router();

messageRoutes.post('/:userId', messageController.sendMessage);

messageRoutes.get('/', messageController.getAllMessages);

module.exports = messageRoutes;
