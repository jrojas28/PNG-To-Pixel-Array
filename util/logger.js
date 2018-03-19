/**
 * @file Logger creator utility
 */
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

export default (loggerName) => createLogger({
    format: combine(
        label({ label: loggerName }),
        timestamp(),
        prettyPrint(),
    ),
    transports: [new transports.Console()]
});