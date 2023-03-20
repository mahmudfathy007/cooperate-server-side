const logger = require('./logger');
let io;

module.exports = {
  init: (httpServer) => {
    if (!io) {
      logger.info('Initializing socket.io');
      io = require('socket.io')(httpServer, {
        cors: {
          origin: '*',
        },
      });
    } else {
      logger.info('Using existing socket.io instance');
    }
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized');
    }
    return io;
  },
};
