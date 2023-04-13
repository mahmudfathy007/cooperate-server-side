const Job = require('../models/job.model');
const Project = require('../models/project.model');
const User = require('../models/user.model');
const Socket = require('../models/socket.model');

const adminDashBoard = async (req, res) => {
  try {
    const [projectCount, jobCount, userCount, activeUsersCount, freelancerCount, clientCount, adminCount] =
      await Promise.all([
        Project.countDocuments(),
        Job.countDocuments(),
        User.countDocuments(),
        Socket.countDocuments(),
        User.countDocuments({ role: 'freelancer' }),
        User.countDocuments({ role: 'client' }),
        User.countDocuments({ role: 'admin' }),
      ]);

    const message = { projectCount, jobCount, userCount, activeUsersCount, freelancerCount, clientCount, adminCount };
    res.status(200).json({
      message: message,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  adminDashBoard,
  deleteUser,
};
