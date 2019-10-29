const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('../utils/logger');
const morgan = require('morgan');

const corsMiddleware = cors();
const compressionMiddleware = compression();
const httpLoggerMiddleware = morgan('combined', { stream: logger.stream });
const jsonParserMiddleware = express.json({ limit: '5mb' });
const secureHeadersMiddleware = helmet();

const middlewares = [
  corsMiddleware, // cross origin resource sharing
  httpLoggerMiddleware, // log HTTP requests
  secureHeadersMiddleware, // set security-related HTTP headers
  jsonParserMiddleware, // parse json request body
  compressionMiddleware, // compress response bodies
];

module.exports = middlewares;
