import { TTaskBody } from "../../types";
import { TaskMemoryRepository } from "./task.memory.repository";
import { Task } from "./task.model";

export class TaskService {
  taskRepository: TaskMemoryRepository;

  constructor(taskRepository: TaskMemoryRepository) {
    this.taskRepository = taskRepository;
  }

  getAllTasks = async (boardId: string): Promise<Task[]> => {
    const tasks = this.taskRepository.getAll(boardId);
    return tasks;
  };

  getTaskById = async (taskId: string, boardId: string): Promise<Task> => {
    const task = await this.taskRepository.getById(taskId, boardId);
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