import { Task } from './task.model.js';
import { database } from '../../database/index.js';

/**
* A class to represent an in-memory repository of Task entity
* @class
* @property {Task[]} tasks - An array of tasks
*/
export class TaskMemoryRepository {
  constructor() {
    this.tasks = database.tasks;
  }

   /**
   * Get lists of all tasks
   * @async
   * @method
   * @returns {Promise<Task[]>} List of all tasks
   */
  getAllTasks = async () => this.tasks;

   /**
   * Get lists of user's tasks
   * @async
   * @method
   * @param {string} userId - Id of assigned user
   * @returns {Promise<Task[]>} List of user's tasks
   */
  getAllUserTasks = async (userId) => {
    const userTasks = this.tasks.filter((task) => task.userId === userId);
    return userTasks;
  }

   /**
   * Get lists of board's tasks
   * @async
   * @method
   * @param {string} boardId - Id of board
   * @returns {Promise<Task[]>} List of board's tasks
   */
  getAllBoardTasks = async (boardId) => {
    const boardTasks = this.tasks.filter((task) => task.boardId === boardId);
    return boardTasks;
  };

  /**
   * Get single task by its id
   * @async
   * @method
   * @param {string} boardId - Id of task's board
   * @param {string} taskId - Id of requested task
   * @returns {Promise<Task>} Requested task instance
   * @throws {NotFoundError} If no task founded
   */
  getTaskById = async (boardId, taskId) => {
    const foundedTask = this.tasks.find((task) => task.id === taskId && task.boardId === boardId);
    if (!foundedTask) throw Error('Not Found Error: no task matches this request');
    return foundedTask;
  }

  /**
   * Create a new Task in database
   * @async
   * @method
   * @param {string} boardId - Id of task's board
   * @param {Object.<Task>} taskBody - Object with Task fields
   * @returns {Promise<Task>} New instance of Task
   */
  createTask = async (boardId, taskBody) => {
    const newTask = new Task({ ...taskBody, boardId });
    this.tasks.push(newTask);
    return newTask;
  }

  /**
   * Update an existed task in database by its id
   * @async
   * @method 
   * @param {string} boardId - Id of task's board
   * @param {Object.<Task>} taskBody - Object with some Task fields
   * @returns {Promise<Task>}
   * @throws {NotFoundError} If no task founded
   */
  updateTask = async (boardId, taskBody) => {
    const taskId = taskBody.id;
    const taskToUpdateIndex = this.tasks.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (taskToUpdateIndex === -1) throw Error('Not Found Error: no task matches this request');
    const updatedTask = { ...this.tasks[taskToUpdateIndex], ...taskBody };
    this.tasks[taskToUpdateIndex] = updatedTask;
    return updatedTask;
  }

  /**
   * Delete an existed task in database by its id
   * @async
   * @method
   * @param {string} boardId - Id of task's board
   * @param {string} taskId - Id of task to delete
   * @returns {Promise<Task>}
   * @throws {NotFoundError} If no task founded
   */
  deleteTask = async (boardId, taskId) => {
    const deletedTaskIndex = this.tasks.findIndex((task) => task.id === taskId && task.boardId === boardId);
    if (deletedTaskIndex === -1) throw Error('Not Found Error: no task matches this request');
    const deletedTask = { ...this.tasks[deletedTaskIndex] };
    this.tasks.splice(deletedTaskIndex, 1);
    return deletedTask;
  }
}