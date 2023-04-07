const Message = require('../models/message.model');

const sendMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;
    const newMessage = new Message({
      sender_id: userId,
      message,
    });
    await newMessage.save();
    return res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    return res.status(201).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getAllMessages,
};
