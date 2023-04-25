const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    rated_user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    job_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Job',
    },
    value: {
      type: Number,
    },
    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
