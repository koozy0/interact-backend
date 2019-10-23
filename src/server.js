const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const routes = require('./routes');

const port = process.env.PORT || 5000;

const app = express();

app.use(routes);

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.emit('message', `client ${socket.id} has connected`);

  socket.on('client-message', message =>
    socket.broadcast.emit('message', { clientId: socket.id, message }),
  );

  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
