const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    conversation_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Conversation',
    },
    sender_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
