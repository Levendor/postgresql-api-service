import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import { createUserRouter, UserController, UserService, UserMemoryRepository } from './resources/users/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createApp = () => {
  const app = express();
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  
  app.use(cors());
  app.use(express.json());  
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));  
  app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });
  
  app.use('/users', createUserRouter(new UserController(new UserService(new UserMemoryRepository))));

  app.use((err, req, res, next) => {
    if (res.headerSent) {
      next(err);
    }

    console.log(err.message);
    const { method, originalUrl, body, params } = req;
    const { name, message, stack } = err;
    res.status(500).json({
      method,
      originalUrl,
      body,
      params,
      name,
      message,
      stack
    })
  })

  return app;
}
