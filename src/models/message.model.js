const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    subject: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ['read', 'unread'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
