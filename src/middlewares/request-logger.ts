import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { logger } from '../common/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const { method, originalUrl, body, query, headers } = req;

  next();

  finished(res, () => {
    const { statusCode } = res;

    logger('info', 'Incoming request:', { method, path: originalUrl, body, query, headers, statusCode });
  })
}