import { Request } from "express";
import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
const { NOT_FOUND } = StatusCodes;

export const notFound = (req: Request): void => {
  const { headers, originalUrl } = req;

  const message = {
    statusCode: NOT_FOUND,
    message: `There is nothing at http://${headers.host}${originalUrl}`,
  }

  throw newError(NOT_FOUND, message.message);
}