const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../utils/logger');

const compressionMiddleware = compression();
const httpLoggerMiddleware = morgan('combined', { stream: logger.stream });
const jsonParserMiddleware = express.json({ limit: '5mb' });
const secureHeadersMiddleware = helmet();

const middlewares = [
  httpLoggerMiddleware, // log HTTP requests
  secureHeadersMiddleware, // set security-related HTTP headers
  jsonParserMiddleware, // parse json request body
  compressionMiddleware, // compress response bodies
];

module.exports = middlewares;
