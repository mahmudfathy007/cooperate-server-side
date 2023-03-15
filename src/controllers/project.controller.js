const Job = require('../models/job.model');
const Project = require('../models/project.model');
const Proposal = require('../models/proposal.model');
const User = require('../models/user.model');

const createProject = async (req, res) => {
  const { proposal_id } = req.body;
  try {
    const existingProposal = await Proposal.findByIdAndUpdate(proposal_id, { proposal_status: 'accepted' });
    if (existingProposal) {
      const job = await Job.findByIdAndUpdate(existingProposal.job_id, { status: true });
      if (job) {
        const project = await Project.create({
          client_id: job.client_id,
          Freelancer_id: existingProposal.freelancer_id,
          job: job,
        });
        await project.save();
        const user = await User.findById(job.client_id);
        if (user) {
          user.jobs = user.jobs.filter((j) => j.toString() !== existingProposal.job_id.toString());
        }
        await user.save();
        return res.status(201).json({ project });
      } else {
        return res.status(404).json({ message: 'Job not found' });
      }
    } else {
      return res.status(404).json({ message: 'Proposal not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({
      $or: [{ client_id: userId }, { freelancer_id: userId }],
    });
    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
};
