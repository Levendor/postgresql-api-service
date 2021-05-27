import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } = process.env;
const AUTH_MODE = process.env['AUTH_MODE'] === 'true';

export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE };
