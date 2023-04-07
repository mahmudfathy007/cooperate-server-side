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

    res.status(200).json({
      message: `Active projects =  ${projectCount}, Posted Jobs =  ${jobCount}, Number of users =  ${userCount} , Active users = ${activeUsersCount} , Freelancers = ${freelancerCount} , Clients = ${clientCount} , Admins = ${adminCount}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  adminDashBoard,
};
