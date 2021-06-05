import express, { Express } from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import newError from 'http-errors';

import './common/uncaught-exception';
import './common/unhandled-rejection';
import { createUserRouter, UserController, UserService, UserRepository } from './resources/users';
import { createBoardRouter, BoardController, BoardService, BoardRepository } from './resources/boards';
import { createTaskRouter, TaskController, TaskService, TaskRepository } from './resources/tasks';
import { serverIsRunning, requestLogger, errorHandler, notFound } from './middlewares';
import { StatusCodes } from 'http-status-codes';
const { INTERNAL_SERVER_ERROR } = StatusCodes;

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

  app.use(notFound);

  app.use(errorHandler);

  app.use('/reject', () => {
    Promise.reject(newError(INTERNAL_SERVER_ERROR, 'Promise rejected!'));
  })
  app.use('/except', () => {
    setTimeout(
      () => {
        throw newError(INTERNAL_SERVER_ERROR, 'Exception occurred!')
      },
      0);
  });

  return app;
}
