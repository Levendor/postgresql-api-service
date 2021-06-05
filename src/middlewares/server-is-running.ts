import { Request, Response, NextFunction } from 'express';

export const serverIsRunning = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
}