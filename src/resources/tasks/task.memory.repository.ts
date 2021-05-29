import { Task } from './';
import { database } from '../../database';
import { TTaskBody } from '../../types';

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
    if (!foundedTask) throw Error('Not Found Error: no task matches this request');
    return foundedTask;
  }

  create = async (taskBody: TTaskBody, boardId: string): Promise<Task> => {
    const newTask = new Task({ ...taskBody, boardId });
    this.entities.push(newTask);
    return newTask;
  }

  update = async (taskBody: TTaskBody, boardId: string | null): Promise<Task> => {
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

  // getAllFromUser = async (userId: string): Promise<Task[]> => {
  //   const userTasks = this.entities.filter((task) => task.userId === userId);
  //   return userTasks;
  // }

  // getAllFromBoard = async (boardId: string): Promise<Task[]> => {
  //   const boardTasks = this.entities.filter((task) => task.boardId === boardId);
  //   return boardTasks;
  // };
}