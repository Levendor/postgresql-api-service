import { NextFunction, Request, Response } from "express";
import { TaskService } from "./task.service";

export class TaskController {
  taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) return next(new Error('Bad Request Error: no boardId is provided'));
      const tasks = await this.taskService.getAllTasks(boardId);
      res.json(tasks);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, boardId } = req.params;
      if (!taskId || !boardId) return next(new Error('Bad Request Error: no boardId or taskId are provided'));
      const foundedTask = await this.taskService.getTaskById(taskId, boardId);
      res.json(foundedTask);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      if (!boardId) return next(new Error('Bad Request Error: no boardId is provided'));
      const taskBody = req.body;
      const createdTask = await this.taskService.createTask(taskBody, boardId);
      res.status(201).json(createdTask);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, boardId } = req.params;
      if (!taskId || !boardId) return next(new Error('Bad Request Error: no boardId or taskId are provided'));
      const taskBody = { taskId, ...req.body };
      const updatedTask = await this.taskService.updateTask(taskBody, boardId);
      res.json(updatedTask);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, boardId } = req.params;
      if (!taskId || !boardId) return next(new Error('Bad Request Error: no boardId or taskId are provided'));
      const deletedTask = await this.taskService.deleteTask(taskId, boardId);
      res.status(204).json(deletedTask);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }
}