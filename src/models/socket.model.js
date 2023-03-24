const mongoose = require('mongoose');

const socketSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
    required: true,
    unique: true,
  },
});

// Add cascading delete for socket records when a socket is disconnected
socketSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Socket.deleteMany({ userId: doc.userId });
  }
});

const Socket = mongoose.model('Socket', socketSchema);

module.exports = Socket;
