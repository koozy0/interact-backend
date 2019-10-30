const winston = require('winston');
const config = require('../config');

const { format, transports, createLogger } = winston;

const getDate = () =>
  new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, '');

const formatter = format.combine(
  format.label({ label: 'server' }),
  format.errors({ stack: true }),
  format.timestamp(),
  format.splat(),
  format.json(),
);

const consoleTransport = new transports.Console({
  ...config.winston,
  json: false,
  colorize: true,
  format: format.prettyPrint(),
});

const fileTransport = new transports.File({
  ...config.winston,
  json: true,
  colorize: false,
  maxsize: 5242880, //5MB
  maxFiles: 5,
  filename: `./logs/combined_${getDate()}.log`,
});

const logger = createLogger({
  format: formatter,
  transports: [consoleTransport, fileTransport],
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message, { label: 'network' });
  },
};

module.exports = logger;
