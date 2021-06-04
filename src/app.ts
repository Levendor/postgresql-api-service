import express, { Express } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import './common/unhandled-rejection';
import { createUserRouter, UserController, UserService, UserRepository } from './resources/users';
import { createBoardRouter, BoardController, BoardService, BoardRepository } from './resources/boards';
import { createTaskRouter, TaskController, TaskService, TaskRepository } from './resources/tasks';
import { serverIsRunning, requestLogger, errorHandler } from './middlewares';

export const createApp = (): Express => {
  const app = express();
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  
  app.use(cors());
  app.use(express.json());  
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));  
  app.use('/', serverIsRunning);

  const taskRepository = new TaskRepository;
  
  app.use(requestLogger);

  app.use('/users', createUserRouter(new UserController(new UserService(new UserRepository, taskRepository))));
  app.use('/boards', createBoardRouter(new BoardController(new BoardService(new BoardRepository, taskRepository))))
  app.use('/boards/:boardId/tasks', createTaskRouter(new TaskController(new TaskService(taskRepository))))
  app.use('/reject', () => {
    Promise.reject('Promise rejected!');
  })

  app.use(errorHandler);

  return app;
}
