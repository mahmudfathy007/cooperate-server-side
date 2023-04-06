const User = require('../models/user.model');
const Favorite = require('../models/favourite.model');

const addJobToFavorite = async (req, res) => {
  try {
    const { userId } = req.params;
    const { job_id } = req.body;

    const existingFavorite = await Favorite.findOne({ job_id, freelancer_id: userId });
    if (existingFavorite) {
      return res.status(404).json({ message: 'you have added this job to your favorite before' });
    }
    await Favorite.create({
      freelancer_id: userId,
      job_id,
    });
    return res.status(200).json({ message: 'job added to your favorite' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const addFreelancerToFavorite = async (req, res) => {
  try {
    const { userId } = req.params;
    const { freelancer_id } = req.body;

    const user = await User.findById(userId);
    const existingFavorite = await Favorite.findOne({ freelancer_id, client_id: userId });
    if (existingFavorite) {
      return res.status(404).json({ message: 'you have added this freelancer to your favorite before' });
    }
    const newFavorite = await Favorite.create({
      client_id: userId,
      freelancer_id,
    });
    user.favorites.push(newFavorite);
    return res.status(200).json({ message: 'freelancer added to your favorite' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addJobToFavorite,
  addFreelancerToFavorite,
};
