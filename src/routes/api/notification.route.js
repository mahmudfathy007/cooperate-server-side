const express = require('express');
const { authenticate } = require('../../middlewares/authentication');
const { authorization } = require('../../middlewares/authorization');
const notificationController = require('../../controllers/notification.controller');

const notificationRoutes = express.Router();

notificationRoutes.put('/:notificationId', notificationController.markAsRead);

notificationRoutes.get('/:userId', notificationController.getAllNotifications);

module.exports = notificationRoutes;
