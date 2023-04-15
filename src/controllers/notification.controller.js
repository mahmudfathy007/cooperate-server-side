const Notification = require('../models/notification.model');
const User = require('../models/user.model');

const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);
    if (notification) {
      notification.read = true;
      await notification.save();
      return res.status(200).json({ message: 'Notification marked as read' });
    } else {
      return res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.findById(userId);
    if (existingUser) {
      const notifications = await Notification.find({ target: userId }).populate({
        path: 'target user',
        select: 'first_name last_name',
        model: User,
      });
      return res.status(200).json({ notifications });
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  markAsRead,
  getAllNotifications,
};
