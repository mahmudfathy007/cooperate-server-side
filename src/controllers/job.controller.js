const Job = require('../models/job.model');

const postJob = async (req, res) => {
  const { userId } = req.params;
  const { description, payment_type, project_length, category_id, experiance_level, budjet, title } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newJob = await Job.create({
      description,
      payment_type,
      project_length,
      category_id,
      experiance_level,
      budjet,
      title,
    });
    return res.status(201).json({ newJob });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  postJob,
};
