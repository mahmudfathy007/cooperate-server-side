const User = require('../models/user.model');
const Chat = require('../models/chat.model');
const Conversation = require('../models/conversation.model');
const { getIO } = require('../config/socket');

const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { sender_id, message } = req.body;

    const conversation = await Conversation.findById(conversationId);

    const chat = await Chat.create({
      conversation_id: conversationId,
      sender_id,
      message,
    });
    await chat.save();
    conversation.chat.push(chat._id);
    await conversation.save();
    const io = getIO();
    const roomName = `conversation-${conversationId}`;
    io.on('connection', (socket) => {
      socket.join(roomName);
    });

    io.to(roomName).emit('newMessage', chat);

    return res.status(201).json({ chat });
  } catch (error) {
    console.error('Error:', error); // add console log
    return res.status(500).json({ message: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Chat.find({ conversation_id: conversationId });
    return res.status(201).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getAllMessages,
};
