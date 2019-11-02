const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('An error occurred:', err);

  const status = err.status || err.statusCode || 500;
  const code = err.code;
  res.status(status).json({ err, status, code });
};

module.exports = errorHandler;
