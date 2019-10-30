const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('../utils/logger');
const morgan = require('morgan');

// cross origin resource sharing
const corsMiddleware = cors();

// compress response bodies
const compressionMiddleware = compression();

// log HTTP requests by streaming morgan's output to winston
const httpLoggerMiddleware = morgan('combined', { stream: logger.stream });

// parse json request body
const jsonParserMiddleware = express.json({ limit: '5mb' });

// set security-related HTTP headers
const secureHeadersMiddleware = helmet();

const middlewares = [
  corsMiddleware,
  httpLoggerMiddleware,
  secureHeadersMiddleware,
  jsonParserMiddleware,
  compressionMiddleware,
];

module.exports = middlewares;
