const { LOG_LEVEL } = process.env;

const winston = {
  level: LOG_LEVEL || 'silly',
  handleExceptions: true,
};

module.exports = winston;
