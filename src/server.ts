import { createConnection } from 'typeorm';

import { connectionOptions } from './common/ormconfig'
import { PORT as ENV_PORT } from './common/config';
import { createApp } from './app';
import { logger } from './common/logger';

export const PORT: number = Number(ENV_PORT) || 4000;

const onConnect = () => {
  createApp().listen(PORT, () =>
  logger('info', 'App is running on', `http://localhost:${PORT}`)
  );
}

const onError = (error: Error) => {
  const { message, stack } = error;
  logger('error', 'Unable to connect to db', { message, stack });
  process.exit(1);
}

// In-memory database connection
// try {
//   onConnect()
// } catch (error) {
//   onError(error)
// }

// postgreSQL database connection
createConnection(connectionOptions)
  .then(onConnect)
  .catch(onError);
