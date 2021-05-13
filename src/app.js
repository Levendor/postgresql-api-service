import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { createUserRouter, UserController, UserService, UserMemoryRepository } from './resources/users/index.js';
import { __dirname } from './common/config';

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

  return app;
}
