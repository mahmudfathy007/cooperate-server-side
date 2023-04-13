const Message = require('../models/message.model');
const User = require('../models/user.model');

const sendMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message, subject } = req.body;
    const newMessage = new Message({
      subject: subject,
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
    const messages = await Message.find({}).populate({
      path: 'sender_id',
      select: 'first_name last_name email',
      model: User,
    });
    return res.status(201).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const changeStatus = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndUpdate(messageId, { status: 'read' });
    return res.status(201).json({ message });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getAllMessages,
  changeStatus,
};
