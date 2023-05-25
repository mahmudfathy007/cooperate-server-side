const User = require('../models/user.model');
const Project = require('../models/project.model');
const Skills = require('../models/skill.model');
const Category = require('../models/category.model');

const getFreelancers = async (req, res) => {
  try {
    // Get all freelancers
    const freelancers = await User.find({ role: 'freelancer' })
      .populate({
        path: 'skills',
        select: 'name',
        model: Skills,
      })
      .populate({
        path: 'categories',
        select: 'name',
        model: Category,
      });

    // Extract freelancer IDs
    const freelancerIds = freelancers.map((freelancer) => freelancer._id);

    // Find the count of completed projects for each freelancer
    const completedProjectsCounts = await Project.aggregate([
      { $match: { Freelancer_id: { $in: freelancerIds }, project_status: 'Complete' } },
      { $group: { _id: '$Freelancer_id', count: { $sum: 1 } } },
    ]);

    // Sort freelancers based on the count of completed projects in descending order
    const sortedFreelancers = freelancers.sort((a, b) => {
      const countA = completedProjectsCounts.find((item) => item._id.toString() === a._id.toString())?.count || 0;
      const countB = completedProjectsCounts.find((item) => item._id.toString() === b._id.toString())?.count || 0;
      return countB - countA;
    });

    // Return top 50 freelancers
    const top50Freelancers = sortedFreelancers.slice(0, 50);

    return res.status(200).json({ users: top50Freelancers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFreelancers,
};
