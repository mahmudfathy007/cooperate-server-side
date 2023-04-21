const User = require('../models/user.model');
const Job = require('../models/job.model');
const Proposal = require('../models/proposal.model');

const sendProposal = async (req, res) => {
  try {
    const { userId } = req.params;
    const { job_id, cover_letter, website_link, files } = req.body;

    const existingProposal = await Proposal.findOne({ job_id, freelancer_id: userId });
    if (existingProposal) {
      return res.status(404).json({ message: 'you have sent proposal for this job before' });
    }
    const client = await User.findOne({ jobs: job_id });
    const proposal = await Proposal.create({
      freelancer_id: userId,
      job_id,
      cover_letter,
      website_link,
      files,
      client_id: client._id,
    });

    await proposal.save();
    return res.status(201).json({ proposal });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getClientProposals = async (req, res) => {
  const { userId } = req.params;
  try {
    const proposal = await Proposal.find({ client_id: { $in: userId } })
      .populate({
        path: 'job_id',
        model: Job,
      })
      .populate({
        path: 'freelancer_id',
        select: 'first_name last_name',
        model: User,
      });
    if (proposal) {
      return res.status(200).json(proposal);
    }
    return res.status(404).json({ message: 'no proposals found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const declineProposal = async (req, res) => {
  const { proposal_id } = req.body;
  try {
    const existingProposal = await Proposal.findByIdAndUpdate(proposal_id, { proposal_status: 'declined' });
    if (existingProposal) {
      return res.status(200).json({ message: 'proposal declined' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendProposal,
  getClientProposals,
  declineProposal,
};
