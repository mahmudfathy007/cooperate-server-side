const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    freelancer_id: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      ref: 'User',
    },
    client_id: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      ref: 'User',
    },
    job_id: {
      type: mongoose.SchemaTypes.ObjectId,
      // required: true,
      ref: 'Job',
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
