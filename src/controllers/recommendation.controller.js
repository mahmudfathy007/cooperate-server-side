const axios = require('axios');
const User = require('../models/user.model');

const getRecommendations = async (req, res) => {
  try {
    const { freelancerId } = req.params;
    // console.log(freelancerId);
    const freelancerExist = await User.findOne({ _id: freelancerId });
    if (freelancerExist) {
      //   console.log(freelancerExist);
      const response = await axios.get('http://localhost:2000/recommend', {
        Freelancer_id: freelancerId,
      });
      console.log(response.data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRecommendations,
};
