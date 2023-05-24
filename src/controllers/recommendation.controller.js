const axios = require('axios');
const User = require('../models/user.model');
const Jobs = require('../models/job.model');
const Category = require('../models/category.model');
const Skill = require('../models/skill.model');

const getRecommendations = async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const freelancerExist = await User.findOne({ _id: freelancerId });
    if (freelancerExist) {
      const response = await axios.get('http://localhost:2000/recommend', {
        data: {
          Freelancer_id: freelancerId,
        },
      });

      if (response.data) {
        const { recommendations } = response.data;
        const jobArrays = await Promise.all(
          recommendations.map((jobIds) =>
            Jobs.find({ _id: { $in: jobIds }})
              .populate({
                path: 'skills',
                select: 'name',
                model: Skill,
              })
              .populate({
                path: 'category',
                select: 'name',
                model: Category,
              })
          )
        );
        const jobs = jobArrays.flat();
        return res.status(200).json({ jobs });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecommendations,
};
