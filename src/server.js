const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const Socket = require('./models/socket.model');
const { socketChatMiddleware } = require('./middlewares/socket.middleware');

let server;
mongoose.set('strictQuery', false);

mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);

    const io = require('./config/socket').init(server);

    socketChatMiddleware(io);

    io.on('connection', (socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      socket.on('userId', async ({ userId, socketId }) => {
        await Socket.create({
          userId,
          socketId,
        });

        // Store the userId in the socket object for future reference
        logger.info(`User connected with userId: ${userId}`);
      });

      socket.on('disconnect', async () => {
        await Socket.findOneAndDelete({ socketId: socket.id });
        logger.info(`Socket disconnected: ${socket.id}`);
      });
    });
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
