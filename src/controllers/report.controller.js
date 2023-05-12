const Report = require('../models/report.model');

const postReport = async (req, res) => {
  try {
    const { userId } = req.params;
    const { projectId, feedback, targetId } = req.body;
    const existingReport = await Report.findOne({ userId, reported_user: targetId });
    if (existingReport) {
      return res.status(404).json({ message: 'you have reported this user before' });
    }
    const report = await Report.create({
      userId,
      reported_user: targetId,
      projectId,
      feedback,
    });
    await report.save();
    return res.status(201).json({ report });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  postReport,
};
