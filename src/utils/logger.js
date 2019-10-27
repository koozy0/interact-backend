const winston = require('winston');
const config = require('../config');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'server' }),
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      ...config.winston,
      json: false,
      colorize: true,
      format: winston.format.prettyPrint(),
    }),
    new winston.transports.File({
      ...config.winston,
      json: true,
      colorize: false,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      filename: `./logs/combined_${new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '')}.log`,
    }),
  ],
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message, { label: 'network' });
  },
};

module.exports = logger;
