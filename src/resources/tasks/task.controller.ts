import { NextFunction, Request, Response } from "express";
import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { TaskService } from "./task.service";

const { OK, CREATED, NO_CONTENT, BAD_REQUEST } = StatusCodes;

export class TaskController {
  taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) throw newError(BAD_REQUEST, 'No boardId is provided');
      const tasks = await this.taskService.getAllTasks(boardId);
      res.status(OK).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, boardId } = req.params;
      if (!taskId || !boardId) throw newError(BAD_REQUEST, 'No boardId or taskId are provided');
      const foundedTask = await this.taskService.getTaskById(taskId, boardId);
      res.status(OK).json(foundedTask);
    } catch (error) {
      next(error);
    }
  }

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) throw newError(BAD_REQUEST, 'No boardId is provided');
      const taskBody = req.body;
      const createdTask = await this.taskService.createTask(taskBody, boardId);
      res.status(CREATED).json(createdTask);
    } catch (error) {
      next(error);
    }
  }

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, boardId } = req.params;
      if (!taskId || !boardId) throw newError(BAD_REQUEST, 'No boardId or taskId are provided');
      const taskBody = { taskId, ...req.body };
      const updatedTask = await this.taskService.updateTask(taskBody, boardId);
      res.status(OK).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, boardId } = req.params;
      if (!taskId || !boardId) throw newError(BAD_REQUEST, 'No boardId or taskId are provided');
      const deletedTask = await this.taskService.deleteTask(taskId, boardId);
      res.status(NO_CONTENT).json(deletedTask);
    } catch (error) {
      next(error);
    }
  }
}