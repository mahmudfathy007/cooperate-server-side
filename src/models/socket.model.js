const mongoose = require('mongoose');

const socketSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    socketId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Socket = mongoose.model('Socket', socketSchema);

module.exports = Socket;
