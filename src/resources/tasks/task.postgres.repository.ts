import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { getRepository, Repository } from 'typeorm';
import { Task } from '../../database/entities';
import { TTaskDTO } from '../../types';

const { NOT_FOUND } = StatusCodes;

export class TaskPostgresRepository {
  repository: Repository<Task>;
  constructor() {
    this.repository = getRepository(Task);
  }

  getAll = async (key?: string, id?: string): Promise<Task[]> => {
    const tasks = key ? this.repository.find({
      where: { key: id }
    }) : this.repository.find();
    return tasks;
  }

  getById = async (taskId: string, boardId: string): Promise<Task> => {
    const foundedTask = await this.repository.findOne({
      where: {
        id: taskId,
        boardId: boardId
      }
    });
    if (!foundedTask) throw newError(NOT_FOUND, 'No task matches this request');
    return foundedTask;
  }

  create = async (taskBody: TTaskDTO, boardId: string): Promise<Task> => {
    const newTask: Task =  this.repository.create({
      ...taskBody,
      boardId
    });
    await this.repository.insert(newTask);
    return newTask;
  }

  update = async (taskBody: TTaskDTO, boardId: string): Promise<Task> => {
    const taskToUpdate = await this.repository.findOne({
      where: {
        id: taskBody.id,
        boardId: boardId
      }
    });
    if (!taskToUpdate) throw newError(NOT_FOUND, 'No task matches this request');
    const updatedTask = await this.repository.save(taskBody);
    return updatedTask;
  }

  delete = async (taskId: string, boardId: string): Promise<Task> => {
    const taskToDelete = await this.repository.findOne({
      where: {
        id: taskId,
        boardId: boardId
      }
    });
    if (!taskToDelete) throw newError(NOT_FOUND, 'No task matches this request');
    return this.repository.remove(taskToDelete);
  }
}