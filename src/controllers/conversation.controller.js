const Conversation = require('../models/conversation.model');
const Chat = require('../models/chat.model');

const createConversation = async (req, res) => {
  try {
    const { client_id, Freelancer_id } = req.body;
    const existingConversation = await Conversation.findOne({ client_id, Freelancer_id });
    if (existingConversation) {
      return res.status(404).json({ message: 'you have created this conversation before' });
    }
    const conversation = await Conversation.create({
      client_id,
      Freelancer_id,
    });
    await conversation.save();
    return res.status(201).json({ conversation });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({
      $or: [{ client_id: userId }, { Freelancer_id: userId }],
    }).populate({
      path: 'chat',
      model: Chat,
    });
    return res.status(201).json({ conversations });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createConversation,
  getAllConversations,
};
