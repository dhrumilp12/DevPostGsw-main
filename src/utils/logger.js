const winston = require('winston');
const path = require('path');

// Logger configuration
const logConfiguration = {
    // Define which levels of logs to record
    level: 'info',
    // Define the format of log messages
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    // Define transports (outputs)
    transports: [
        // Console transport
        new winston.transports.Console({
            level: 'debug', // Log everything from debug and above (debug, info, warn, error)
        }),
        // File transport
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/app.log'),
            level: 'info', // Log everything from info and above (info, warn, error)
        })
    ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

module.exports = logger;
