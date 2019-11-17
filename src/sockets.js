const logger = require('./utils/logger');
const socketIO = require('socket.io');

const init = server => {
  const io = socketIO(server);

  io.on('connection', socket => {
    const id = socket.id;

    logger.info(`Client connected: ${id}`, { label: 'socket.io' });

    socket.on('join', room => {
      // Join the appropriate room
      socket.join(room);
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${id}`, { label: 'socket.io' });
    });
  });

  return io;
};

module.exports = { init };
