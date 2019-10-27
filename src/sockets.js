const logger = require('./utils/logger');

// Question Model
const Question = require('./models/Question');

const sockets = {};

sockets.init = server => {
  const io = require('socket.io')(server);

  io.on('connection', async socket => {
    const id = socket.id;

    logger.info(`Client connected: ${id}`, { label: 'socket.io' });

    const questions = await Question.find();

    socket.emit(
      'message',
      { msg: `client ${id} has connected`, questions },
      { label: 'socket.io' },
    );

    socket.on('client-message', message => {
      socket.broadcast.emit('message', { clientId: id, message });
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${id}`, { label: 'socket.io' });
    });
  });

  return io;
};

module.exports = sockets;
