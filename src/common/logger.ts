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

const infoFileTransport = new transports.File({
  dirname: './log/',
  filename: 'logs.log',
  level: 'info',
  format: fileFormat,
});

const errorFileTransport = new transports.File({
  dirname: './log/',
  filename: 'errors.log',
  level: 'error',
  format: fileFormat,
});

const winstonLogger = createLogger({
  transports: [
    consoleTransport,
    infoFileTransport,
    errorFileTransport,
  ],
});

type keyOfLogger = keyof typeof winstonLogger;

export const logger = (level: keyOfLogger, header: string, message: Object): void => {
  winstonLogger[level](`${header}\n${JSON.stringify(message, null, 2)}`);
}
