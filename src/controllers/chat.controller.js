const Chat = require('../models/chat.model');

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
  getAllMessages,
};
