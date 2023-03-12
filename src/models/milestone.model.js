const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
      enum: ['Pending', 'Complete'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;
