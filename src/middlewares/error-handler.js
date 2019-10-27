const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('An error occurred:', err);

  if (err.status || err.statusCode) {
    res.sendStatus(err.status || err.statusCode);
  } else {
    res.sendStatus(500);
  }
};

module.exports = errorHandler;
