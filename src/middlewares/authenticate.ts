import { StatusCodes } from 'http-status-codes';
import newError from 'http-errors';
import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';

const { UNAUTHORIZED } = StatusCodes;

export const authenticate: RequestHandler = (req, _res, next) => {
  const token = req.headers.authorization;
  const secretKey = JWT_SECRET_KEY || 'secret-key';

  if (token) {
    verify(token.slice(7), secretKey, (err) => {
      if (err) {
        const error = newError(UNAUTHORIZED, 'Failed to authenticate token!');
        error.stack = err.stack;
        throw error;
      }
    });
  } else {
    throw newError(UNAUTHORIZED, 'No token provided');
  }

  next();
}