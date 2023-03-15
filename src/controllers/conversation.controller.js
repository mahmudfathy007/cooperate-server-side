const User = require('../models/user.model');
const Conversation = require('../models/conversation.model');

const createConversation = async (req, res) => {
  try {
    const { client_id, Freelancer_id } = req.body;
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
