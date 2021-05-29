import express, { Express } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { createUserRouter, UserController, UserService, UserRepository } from './resources/users';
import { createBoardRouter, BoardController, BoardService, BoardRepository } from './resources/boards';
import { createTaskRouter, TaskController, TaskService, TaskRepository } from './resources/tasks';
import { errorHandler } from './middlewares';

export const createApp = (): Express => {
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

  const taskRepository = new TaskRepository;
  
  app.use('/users', createUserRouter(new UserController(new UserService(new UserRepository, taskRepository))));
  app.use('/boards', createBoardRouter(new BoardController(new BoardService(new BoardRepository, taskRepository))))
  app.use('/boards/:boardId/tasks', createTaskRouter(new TaskController(new TaskService(taskRepository))))

  app.use(errorHandler);

  return app;
}
