const Milestone = require('../models/milestone.model');
const Project = require('../models/project.model');

const createMilestone = async (req, res) => {
  try {
    //take the projectId and the title to create the milestone
    const { projectId } = req.params;
    const { title } = req.body;
    //check if the project is already exists or not
    const existingProject = await Project.findById(projectId);
    if (existingProject.project_status === 'Complete') {
      return res.status(400).json({ message: 'Project is already completed.' });
    }
    if (existingProject && existingProject.project_status === 'In progress') {
      const milestone = await Milestone.create({
        title,
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

const updateMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const { status } = req.body;
    const milestone = await Milestone.findByIdAndUpdate(milestoneId, { status: status });
    if (milestone) {
      await milestone.save();
      console.log(milestone);
      return res.json({ message: 'updated milestone successfully' });
    }
    return res.json({ message: 'milestone does not exist.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMilestone,
  updateMilestone,
};
