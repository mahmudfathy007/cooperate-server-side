const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema(
  {
    Tittle: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;
