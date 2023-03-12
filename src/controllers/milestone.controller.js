const Milestone = require('../models/milestone.model');
const Project = require('../models/project.model');

const createMilestone = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { tittle } = req.body;
    const existingProject = await Project.findById(projectId);
    if (existingProject) {
      const milestone = await Milestone.create({
        tittle,
      });
      existingProject.milestone.push(milestone);
      await existingProject.save();
      return res.status(201).json({ milestone });
    }
    return res.status(404).json({ message: ' Project does not exist.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMilestone,
};
