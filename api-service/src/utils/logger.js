/* eslint-disable no-undef */
const winston = require('winston');
const fs = require('fs');

function WinstonFileLogs() {
  const logDir = '/usr/src/app/log/api-service';
  if (!fs.existsSync(logDir)) {
    // Create the directory if it does not exist
    try {
      fs.mkdirSync(logDir, { recursive: true });
    } catch (err) {
      console.log(`err making directory ${logDir}`, err);
      return null;
    }
  }

  return new winston.transports.File({
    level: 'info',
    filename: `${logDir}/logs.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.errors({ stack: true }), // Enable error stack trace
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(({
        level, message, timestamp, stack,
      }) => {
        const ts = timestamp.slice(0, 19).replace('T', ' ');
        if (stack) {
          return `${ts} [${level}]: ${message}\n${stack}`;
        }
        return `${ts} [${level}]: ${message}`;
      }),
    ),
  });
}

winston.loggers.add('app-logs', {
  format: winston.format.combine(
    // winston.format.colorize(),
    winston.format.errors({ stack: true }), // Enable capturing the stack trace
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(({
      level, message, timestamp, stack,
    }) => {
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      if (stack) {
        return `${ts} [${level}]: ${message}\n${stack}`;
      }
      return `${ts} [${level}]: ${message}`;
    }),
  ),
  handleExceptions: true,
  humanReadableUnhandledException: true,
  transports: [
    new winston.transports.Console(),
    // WinstonFileLogs(),
  ],
});

const logger = winston.loggers.get('app-logs');
logger.info('Testing api Info logger');
logger.error('Testing api Error logger');
module.exports = logger;
