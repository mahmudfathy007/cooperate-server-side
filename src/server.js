const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const {
  socketChatMiddleware,
  socketPersistUserMiddleware,
  socketNotificationMiddleware,
} = require('./middlewares/socket.middleware');

let server;
mongoose.set('strictQuery', false);

mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);

    const io = require('./config/socket').init(server);

    socketChatMiddleware(io);
    socketPersistUserMiddleware(io);
    socketNotificationMiddleware(io);
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
