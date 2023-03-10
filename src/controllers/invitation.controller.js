const User = require('../models/user.model');
const Job = require('../models/job.model');
const Invitation = require('../models/invitation.model');

const sendIvitation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { job_id, freelancer_id, invitation_letter } = req.body;

    const existingInvitation = await Invitation.findOne({ job_id, freelancer_id });
    if (existingInvitation) {
      return res.status(404).json({ message: 'you have sent Invitation for this Freelancer about this job before' });
    }

    const existingJob = await Job.findById(job_id);
    console.log('existingJob:', existingJob);
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

module.exports = {
  sendIvitation,
};
