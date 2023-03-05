const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
  files: {
    type: String,
    required: false,
  },
  project_status: {
    type: String,
    required: true,
    enum: ['Active', 'Complete'],
  },
  Dead_line: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
