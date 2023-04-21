const User = require('../models/user.model');
const Job = require('../models/job.model');
const Invitation = require('../models/invitation.model');

const sendInvitation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { job_id, freelancer_id, invitation_letter } = req.body;

    const existingInvitation = await Invitation.findOne({ job_id, freelancer_id });
    if (existingInvitation) {
      return res.status(404).json({ message: 'you have sent Invitation for this Freelancer about this job before' });
    }

    const existingJob = await Job.findById(job_id);

    if (!existingJob) {
      return res.status(404).json({ message: ' you cannot send invitation , Job does not exist.' });
    }

    const invitation = await Invitation.create({
      client_id: userId,
      freelancer_id,
      job_id,
      invitation_letter,
    });

    await invitation.save();
    return res.status(201).json({ invitation });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getInvitations = async (req, res) => {
  const { userId } = req.params;
  try {
    const invitation = await Invitation.find({ freelancer_id: { $in: userId } })
      .populate({
        path: 'job_id',
        model: Job,
      })
      .populate({
        path: 'client_id',
        select: 'first_name last_name',
        model: User,
      });
    if (invitation) {
      return res.status(200).json(invitation);
    }
    return res.status(404).json({ message: 'no invitation found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendInvitation,
  getInvitations,
};
