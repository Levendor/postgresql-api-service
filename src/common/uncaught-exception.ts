import { HttpError } from 'http-errors';
import { logger } from './logger';
import { StatusCodes } from 'http-status-codes';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

process.on('uncaughtException', (error: HttpError) => {
  const { name, message, stack, statusCode = INTERNAL_SERVER_ERROR } = error;
  logger('error', name, { statusCode, message, stack });
  process.exit(1);
});