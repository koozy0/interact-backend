const loaded = require('dotenv').config();

// ensure that .env file has been loaded
if (loaded.error) {
  logger.error('error loading .env file');
}

const auth = require('./auth');
const db = require('./db');
const user = require('./user');
const winston = require('./winston');

module.exports = {
  auth,
  db,
  user,
  winston,
};
