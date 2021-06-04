import { HttpError } from 'http-errors';
import { logger } from './logger';

process.on('unhandledRejection', (reason: HttpError) => {
  const { name, message, stack, statusCode } = reason;
  logger('error', name, { statusCode, message, stack });
  process.exit(1);
})