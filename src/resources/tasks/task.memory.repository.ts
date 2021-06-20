import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { Task } from './';
import { database } from '../../database';
import { TTaskDTO } from '../../types';

const { NOT_FOUND } = StatusCodes;

export class TaskMemoryRepository {
  entities: Task[];

  constructor() {
    this.entities = database.tasks;
  }

  getAll = async (key?: string, id?: string): Promise<Task[]> => {
    const tasks = key ? this.entities.filter((task) => task[key] === id) : this.entities;
    return tasks;
  }

  getById = async (taskId: string, boardId: string): Promise<Task> => {
    const foundedTask = this.entities.find((task) => task.id === taskId && task.boardId === boardId);
    if (!foundedTask) throw newError(NOT_FOUND, 'No task matches this request');
    return foundedTask;
  }

  create = async (taskBody: TTaskDTO, boardId: string): Promise<Task> => {
    const newTask = new Task({ ...taskBody, boardId });
    this.entities.push(newTask);
    return newTask;
  }

  update = async (taskBody: TTaskDTO, boardId: string | null): Promise<Task> => {
    const taskId = taskBody.id;
    const taskToUpdate = this.entities.find((task) => task.id === taskId && task.boardId === boardId);
    if (!taskToUpdate) throw newError(NOT_FOUND, 'No task matches this request');
    const updatedTask = Object.assign(taskToUpdate, taskBody);
    return updatedTask;
  }

  delete = async (taskId: string, boardId: string): Promise<Task> => {
    const deletedTaskIndex = this.entities.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (deletedTaskIndex === -1) throw newError(NOT_FOUND, 'No task matches this request');
    const deletedTask = this.entities.splice(deletedTaskIndex, 1)[0]!;
    return deletedTask;
  }
}