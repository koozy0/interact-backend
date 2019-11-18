const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  const message = err.message;
  const status = err.status || err.statusCode || 500;
  const code = err.code;
  res.status(status).json({ message, status, code });
};

module.exports = errorHandler;
