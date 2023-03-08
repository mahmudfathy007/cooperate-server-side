const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
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
  cover_letter: {
    type: String,
    required: true,
  },
  website_link: {
    type: String,
  },
  files: {
    type: String,
  },
  proposal_status: {
    type: String,
    enum: ['pending', 'accepted'],
  },
  payment_id: {
    type: String,
    ref: 'Job',
  },
  budget: {
    type: Number,
    ref: 'Job',
  },
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
