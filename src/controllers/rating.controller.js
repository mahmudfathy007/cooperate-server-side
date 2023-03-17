const Rating = require('../models/rating.model');
const Project = require('../models/project.model');

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

module.exports = {
  postRate,
};
