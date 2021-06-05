import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { logger } from '../common/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const { method, originalUrl, body, query, params, headers } = req;

  next();

  finished(res, () => {
    const { statusCode } = res;
    const infoMessage = {
      method,
      path: originalUrl,
      statusCode,
      body,
      query,
      params,
      headers,
    }

    logger('info', 'Incoming request:', infoMessage);
  })
}