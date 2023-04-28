const Rating = require('../models/rating.model');
const Project = require('../models/project.model');
const User = require('../models/user.model');

const postRate = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rated_user, job_id, value, feedback } = req.body;
    const existingRate = await Rating.findOne({ user: userId, rated_user });
    if (existingRate) {
      return res.status(404).json({ message: 'you have rated this user before' });
    }
    const Completed = await Project.findOne({ project_status: 'Complete', job: job_id });
    if (!Completed) {
      return res.status(404).json({ message: 'you cannot rate this user because the project is not completed' });
    }
    const rating = await Rating.create({
      user: userId,
      rated_user,
      job_id,
      value,
      feedback,
    });

    await rating.save();
    return res.status(201).json({ rating });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getRatings = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(userId);
    const ratings = await Rating.find({
      rated_user: userId,
    }).populate({
      path: 'rated_user user',
      select: 'first_name last_name',
      model: User,
    });
    console.log(ratings);
    if (ratings.length > 0) {
      return res.status(200).json(ratings);
    }
    return res.status(404).json({ message: 'no rating found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllRatingsForAdmin = async (req, res) => {
  try {
    const ratings = await Rating.find();
    if (ratings) {
      return res.status(200).json(ratings);
    }
    return res.status(404).json({ message: 'no ratings found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postRate,
  getRatings,
  getAllRatingsForAdmin,
};
