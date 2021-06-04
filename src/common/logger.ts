import { createLogger, format, transports } from 'winston';
const { colorize, combine, printf, timestamp, uncolorize } = format;

const consoleFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  colorize(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  }),
);

const fileFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  uncolorize(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  }),
);

const consoleTransport = new transports.Console({
  level: 'info',
  format: consoleFormat,
});

const fileTransport = new transports.File({
  dirname: '../../log',
  filename: 'error.log',
  level: 'error',
  format: fileFormat,
});

const winstonLogger = createLogger({
  transports: [
    consoleTransport,
    fileTransport,
  ],
});

export const logger = (level: string, header: string, message: Object): void => {
  if (level === 'error') winstonLogger.error(`${header}\n${JSON.stringify(message, null, 2)}`);
  else if (level === 'info') winstonLogger.info(`${header}\n${JSON.stringify(message, null, 2)}`);
}
