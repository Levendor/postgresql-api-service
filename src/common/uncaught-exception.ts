import { HttpError } from 'http-errors';
import { logger } from './logger';

process.on('uncaughtException', (error: HttpError) => {
  const { name, message, stack, statusCode } = error;
  logger('error', name, { statusCode, message, stack });
  process.exit(1);
});