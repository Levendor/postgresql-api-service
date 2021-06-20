import { config } from 'dotenv';
import path from 'path';

config({
  path: path.join(__dirname, '../../.env')
});

export const { PORT, NODE_ENV, JWT_SECRET_KEY, AUTH_MODE, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
