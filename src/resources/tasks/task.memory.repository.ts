import { Task } from './task.model.js';
import { database } from '../../database/index.js';
import { TTaskBody } from '../../types/index.js';

export class TaskMemoryRepository {
  entities: Task[];

  constructor() {
    this.entities = database.tasks;
  }

  getAll = async (): Promise<Task[]> => this.entities;

  getAllFromUser = async (userId: string): Promise<Task[]> => {
    const userTasks = this.entities.filter((task) => task.userId === userId);
    return userTasks;
  }

  getAllFromBoard = async (boardId: string): Promise<Task[]> => {
    const boardTasks = this.entities.filter((task) => task.boardId === boardId);
    return boardTasks;
  };

  getById = async (taskId: string, boardId: string): Promise<Task> => {
    const foundedTask = this.entities.find((task) => task.id === taskId && task.boardId === boardId);
    if (!foundedTask) throw Error('Not Found Error: no task matches this request');
    return foundedTask;
  }

  create = async (taskBody: TTaskBody, boardId: string): Promise<Task> => {
    const newTask = new Task({ ...taskBody, boardId });
    this.entities.push(newTask);
    return newTask;
  }

  update = async (taskBody: TTaskBody, boardId: string): Promise<Task> => {
    const taskId = taskBody.id;
    const taskToUpdate = this.entities.find((task) => task.id === taskId && task.boardId === boardId);
    if (!taskToUpdate) throw Error('Not Found Error: no task matches this request');
    const updatedTask = Object.assign(taskToUpdate, taskBody);
    return updatedTask;
  }

  delete = async (taskId: string, boardId: string): Promise<Task> => {
    const deletedTaskIndex = this.entities.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (deletedTaskIndex === -1) throw Error('Not Found Error: no task matches this request');
    const deletedTask = this.entities.splice(deletedTaskIndex, 1)[0]!;
    return deletedTask;
  }
}