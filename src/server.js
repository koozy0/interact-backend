const config = require('./config');
const express = require('express');
const middlewares = require('./middlewares');
const mongoose = require('mongoose');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const logger = require('./utils/logger');
const sockets = require('./sockets');

const app = express();

// Use middlewares
app.use(...middlewares);

// DB Config
const mongoURI = config.db.mongoURI;

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('Connected to MongoDB', { label: 'database' }))
  .catch(err => logger.error('Error connecting to MongoDB', err));

// Use routes
app.use(routes);

// Use error handler
app.use(errorHandler);

// Create HTTP server
const server = require('http').createServer(app);

// Initialise socket.io
const io = sockets.init(server);
app.set('io', io);

const port = process.env.PORT || 5000;

server.listen(port, () => logger.info(`Listening on port ${port}`));
