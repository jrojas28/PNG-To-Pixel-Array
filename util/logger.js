/**
 * @file Logger creator utility
 */
import config from 'config';
import { createLogger, format, transports } from 'winston';


const {
  combine,
  timestamp,
  label,
  json,
  printf,
} = format;

/**
 * Allows to have an empty logger.
 */
const emptyFormat = printf(() => '');

export default (loggerName) => {
  const loggerFormat = config.get('logging') ? combine(
    label({ label: loggerName }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
  ) : emptyFormat;

  return createLogger({
    format: loggerFormat,
    transports: [new transports.Console()],
  });
};
