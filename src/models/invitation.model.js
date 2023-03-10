const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema(
  {
    freelancer_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    client_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    job_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Job',
    },
    invitation_letter: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
