const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      ref: 'User',
    },
    Freelancer_id: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      ref: 'User',
    },
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      ref: 'Job',
    },
    files: {
      type: String,
      required: false,
    },
    project_status: {
      type: String,
      // required: true,
      enum: ['Active', 'Complete'],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
