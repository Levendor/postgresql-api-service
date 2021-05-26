/**
 * A class to represent a service to operate with Task repository
 * @class
 * @property {TaskRepository} taskRepository - an instance of Task Repository
 */
export class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Get list of all tasks
   * @async
   * @method
   * @param {string} boardId - Id of task's board
   * @returns {Promise<Task[]>} List of all tasks
   */
  getAllTasks = async (boardId) => {
    const tasks = this.taskRepository.getAllBoardTasks(boardId);
    return tasks;
  };

  /**
   * Get single task by its id
   * @async
   * @method
   * @param {string} boardId - Id of task's board
   * @param {string} taskId - Id of requested task
   * @returns {Promise<Task>} Requested task instance
   */
  getTaskById = async (boardId, taskId) => {
    const task = await this.taskRepository.getTaskById(boardId, taskId);
    return task;
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
    const newTask = await this.taskRepository.createTask(boardId, taskBody);
    return newTask;
  }

  /**
   * Update an existed task in database by its id
   * @async
   * @method 
   * @param {string} boardId - Id of task's board
   * @param {Object.<Task>} taskBody - Object with some Task fields
   * @returns {Promise<Task>}
   */
  updateTask = async (boardId, taskBody) => {
    const updatedTask = await this.taskRepository.updateTask(boardId, taskBody);
    return updatedTask;
  }

  /**
   * Delete an existed task in database by its id
   * @async
   * @method
   * @param {string} boardId - Id of task's board
   * @param {string} taskId - Id of task to delete
   * @returns {Promise<Task>}
   */
  deleteTask = async (boardId, taskId) => {
    const deletedTask = await this.taskRepository.deleteTask(boardId, taskId);
    return deletedTask;
  }
}