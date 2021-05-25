export class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  getAllTasks = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const tasks = await this.taskService.getAllTasks(boardId);
      res.json(tasks);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  getTaskById = async (req, res, next) => {
    try {
      const { boardId, taskId } = req.params;
      const foundedTask = await this.taskService.getTaskById(boardId, taskId);
      res.json(foundedTask);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  createTask = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const taskBody = req.body;
      const createdTask = await this.taskService.createTask(boardId, taskBody);
      res.status(201).json(createdTask);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  updateTask = async (req, res, next) => {
    try {
      const { boardId, taskId } = req.params;
      const taskBody = { taskId, ...req.body };
      const updatedTask = await this.taskService.updateTask(boardId, taskBody);
      res.json(updatedTask);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  deleteTask = async (req, res, next) => {
    try {
      const { boardId, taskId } = req.params;
      const deletedTask = await this.taskService.deleteTask(boardId, taskId);
      res.status(204).json(deletedTask);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }
}