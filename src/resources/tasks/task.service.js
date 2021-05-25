export class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  getAllTasks = async (boardId) => {
    const tasks = this.taskRepository.getAllBoardTasks(boardId);
    return tasks;
  };

  getTaskById = async (boardId, taskId) => {
    const task = await this.taskRepository.getTaskById(boardId, taskId);
    return task;
  }

  createTask = async (boardId, taskBody) => {
    const newTask = await this.taskRepository.createTask(boardId, taskBody);
    return newTask;
  }

  updateTask = async (boardId, taskBody) => {
    const updatedTask = await this.taskRepository.updateTask(boardId, taskBody);
    return updatedTask;
  }

  deleteTask = async (boardId, taskId) => {
    const deletedTask = await this.taskRepository.deleteTask(boardId, taskId);
    return deletedTask;
  }
}