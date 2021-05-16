import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';

import { createUserRouter, UserController, UserService, UserRepository } from './resources/users/index.js';
import { createBoardRouter, BoardController, BoardService, BoardRepository } from './resources/boards/index.js';
import { createTaskRouter, TaskController, TaskService, TaskRepository } from './resources/tasks/index.js';
import { errorHandler } from './middlewares/error-handler.js';

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
  
  app.use('/users', createUserRouter(new UserController(new UserService(new UserRepository))));
  app.use('/boards', createBoardRouter(new BoardController(new BoardService(new BoardRepository))))
  app.use('/boards/:boardId/tasks', createTaskRouter(new TaskController(new TaskService(new TaskRepository))))

  app.use(errorHandler);

  return app;
}
