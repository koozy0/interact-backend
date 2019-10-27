const loaded = require('dotenv').config();

// ensure that .env file has been loaded
if (loaded.error) {
  logger.error('error loading .env file');
}

const authentication = require('./authentication');
const db = require('./db');
const winston = require('./winston');

module.exports = { authentication, db, winston };
