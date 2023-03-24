const Chat = require('../models/chat.model');
const Conversation = require('../models/conversation.model');
const Socket = require('../models/socket.model');
const logger = require('../config/logger');

function socketChatMiddleware(io) {
  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ conversationId }) => {
      const roomName = `conversation-${conversationId}`;
      console.log(`Joining room ${roomName}`);
      socket.join(roomName);
    });
    socket.on('sendMessage', async ({ conversationId, message, senderId }) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          console.log(`Conversation with ID ${conversationId} not found`);
          return;
        }

        const chat = await Chat.create({
          conversation_id: conversationId,
          sender_id: senderId,
          message,
        });
        await chat.save();

        conversation.chat.push(chat._id);
        await conversation.save();

        const roomName = `conversation-${conversationId}`;
        io.to(roomName).emit('newMessage', chat);
      } catch (error) {
        console.log(`Error sending message: ${error}`);
      }
    });
  });
}
function socketPersistUserMiddleware(io) {
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on('userId', async ({ userId, socketId }) => {
      try {
        await Socket.create({
          userId,
          socketId,
        });
        logger.info(`User connected with userId: ${userId}`);
      } catch (error) {
        // Handle duplicate key error if the record already exists
        if (error.code === 11000) {
          logger.warn(`User with userId: ${userId} already exists`);
        } else {
          logger.error(`Error saving user with userId: ${userId}`, error);
        }
      }

      // Store the userId in the socket object for future reference
      socket.userId = userId;
    });

    socket.on('disconnect', async () => {
      await Socket.findOneAndDelete({ socketId: socket.id });
      logger.info(`Socket disconnected: ${socket.id}`);
      socket.disconnect();
    });
  });
}
module.exports = { socketChatMiddleware, socketPersistUserMiddleware };
