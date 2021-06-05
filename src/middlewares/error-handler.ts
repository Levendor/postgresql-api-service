import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../common/logger';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) next(err);

  const { method, originalUrl, body, query, params, headers, } = req;
  const { name, message, stack, statusCode = INTERNAL_SERVER_ERROR } = err;
  const errorMessage = {
    statusCode,
    name,
    message,
    method,
    path: originalUrl,
    body,
    query,
    params,
    headers,
    stack,
  }

  logger('error', name, errorMessage);

  res.status(statusCode).json(errorMessage)

  return next();
}