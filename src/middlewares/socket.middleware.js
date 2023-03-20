const Chat = require('../models/chat.model');
const Conversation = require('../models/conversation.model');

function socketChatMiddleware(io) {
  io.on('connection', (socket) => {
    socket.on('sendMessage', async ({ conversationId, message, senderId }) => {
      //   console.log(conversationId, message, senderId);

      const conversation = await Conversation.findById(conversationId);

      const chat = await Chat.create({
        conversation_id: conversationId,
        sender_id: senderId,
        message,
      });
      await chat.save();
      conversation.chat.push(chat._id);
      await conversation.save();
      //   console.log(chat);
      const roomName = `conversation-${conversationId}`;
      socket.join(roomName);
      io.to(roomName).emit('newMessage', chat);
    });
  });
}
module.exports = { socketChatMiddleware };
