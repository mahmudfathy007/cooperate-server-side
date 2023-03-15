const User = require('../models/user.model');
const Chat = require('../models/chat.model');

const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { sender_id, message } = req.body;
    const chat = await Chat.create({
      conversation_id: conversationId,
      sender_id,
      message,
    });
    await chat.save();
    return res.status(201).json({ chat });
  } catch (error) {
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
