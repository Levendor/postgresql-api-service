import { createConnection } from 'typeorm';

import { PORT } from './common/config';
import { connectionOptions } from './common/ormconfig'
import { createApp } from './app';
import { logger } from './common/logger';

export const APP_PORT: number = Number(PORT) || 4000;

const onConnect = () => {
  createApp().listen(APP_PORT, () =>
  logger('info', 'App is running on', { URL: `http://localhost:${APP_PORT}` })
  );
}

const onError = (error: Error) => {
  const { message, stack } = error;
  logger('error', 'Unable to connect to db', { message, stack });
  process.exit(1);
}

createConnection(connectionOptions)
  .then(onConnect)
  .catch(onError);
