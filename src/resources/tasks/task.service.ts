import { IRepositoryExtended, TTaskBody } from "../../types";
import { Task } from "./task.model";

export class TaskService {
  taskRepository: IRepositoryExtended<Task>;

  constructor(taskRepository: IRepositoryExtended<Task>) {
    this.taskRepository = taskRepository;
  }

  getAllTasks = async (boardId: string): Promise<Task[]> => {
    const tasks = this.taskRepository.getAllFromBoard(boardId);
    return tasks;
  };

  getTaskById = async (taskId: string, boardId: string): Promise<Task> => {
    const task = await this.taskRepository.getById(boardId, taskId);
    return task;
  }

  createTask = async (taskBody: TTaskBody, boardId: string): Promise<Task> => {
    const newTask = await this.taskRepository.create(taskBody, boardId);
    return newTask;
  }

  updateTask = async (taskBody: TTaskBody, boardId: string): Promise<Task> => {
    const updatedTask = await this.taskRepository.update(taskBody, boardId);
    return updatedTask;
  }

  deleteTask = async (taskId: string, boardId: string): Promise<Task> => {
    const deletedTask = await this.taskRepository.delete(taskId, boardId);
    return deletedTask;
  }
}