const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    Freelancer_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    job: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Job',
    },
    files: {
      type: String,
      required: false,
    },
    projectUrl: {
      type: String,
      required: false,
    },
    project_status: {
      type: String,
      enum: ['In progress', 'Complete'],
      default: 'In progress',
    },
    milestone: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Milestone',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
