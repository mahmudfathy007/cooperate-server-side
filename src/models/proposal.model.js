const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User',
  },
  Freelancer_id: {
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
    required: true,
  },
  files: {
    type: String,
    required: false,
  },
  project_status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted'],
  },
  payment_id: {
    type: String,
    required: true,
    ref: 'Job',
  },
  budget: {
    type: Number,
    required: true,
    ref: 'Job',
  },
});
