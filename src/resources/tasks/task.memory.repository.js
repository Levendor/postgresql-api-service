import { Task } from './task.model.js';
import { database } from '../../database/index.js';

export class TaskMemoryRepository {
  constructor() {
    this.tasks = database.tasks;
  }

  getAllTasks = async (boardId) => {
    const boardTasks = this.tasks.filter((task) => task.boardId === boardId);
    if (!boardTasks.length) throw Error('Not Found Error: no tasks match this request');
    return boardTasks;
  };

  getTaskById = async (boardId, taskId) => {
    const foundedTask = this.tasks.find((task) => task.id === taskId && task.boardId === boardId);
    if (!foundedTask) throw Error('Not Found Error: no task matches this request');
    console.log(foundedTask);
    return foundedTask;
  }

  createTask = async (boardId, taskBody) => {
    const newTask = new Task({ ...taskBody, boardId });
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask = async (boardId, taskBody) => {
    const taskId = taskBody.id;
    const taskToUpdateIndex = this.tasks.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (taskToUpdateIndex === -1) throw Error('Not Found Error: no task matches this request');
    const updatedTask = { ...this.tasks[taskToUpdateIndex], ...taskBody };
    this.tasks[taskToUpdateIndex] = updatedTask;
    return updatedTask;
  }

  deleteTask = async (boardId, taskId) => {
    const deletedTaskIndex = this.tasks.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (deletedTaskIndex === -1) throw Error('Not Found Error: no task matches this request');
    const deletedTask = { ...this.tasks[deletedTaskIndex] };
    this.tasks.splice(deletedTaskIndex, 1);
    return deletedTask;
  }
}