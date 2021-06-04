import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) next(err);

  const { method, originalUrl, body, params } = req;
  const { name, message, stack, statusCode = StatusCodes.INTERNAL_SERVER_ERROR } = err;
  const errorMessage = {
    method,
    originalUrl,
    body,
    params,
    name,
    message,
    statusCode
  }
  console.log('--------------->', errorMessage);
  res.status(statusCode).json({ ...errorMessage, stack })
}