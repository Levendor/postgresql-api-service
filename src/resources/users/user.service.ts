import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { IRepository, TUserDTO, TUserToResponse } from '../../types/index';
// import { TaskMemoryRepository } from '../tasks/task.memory.repository';
import { TaskPostgresRepository } from '../tasks/task.postgres.repository';
import { User } from './';

const { BAD_REQUEST } = StatusCodes;

export class UserService {
  userRepository: IRepository<User>;
  taskRepository: TaskPostgresRepository;

  constructor(userRepository: IRepository<User>, taskRepository: TaskPostgresRepository) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  getAllUsers = async (): Promise<TUserToResponse[]> => {
    const users = await this.userRepository.getAll();
    return users.map(User.toResponse);
  };

  getUserById = async (userId: string): Promise<TUserToResponse> => {
    const user = await this.userRepository.getById(userId);
    return User.toResponse(user);
  }

  createUser = async (userBody: TUserDTO): Promise<TUserToResponse> => {
    const users = await this.userRepository.getAll();
    const isDuplicatedLogin = users.some((user) => user.login === userBody.login)
    if (isDuplicatedLogin) throw newError(BAD_REQUEST, 'Login is occupied');
    const newUser = await this.userRepository.create(userBody);
    return User.toResponse(newUser);
  }

  updateUser = async (userBody: TUserDTO): Promise<TUserToResponse> => {
    const users = await this.userRepository.getAll();
    const isDuplicatedLogin = users.some((user) => user.login === userBody.login && user.id !== userBody.id);
    if (isDuplicatedLogin) throw newError(BAD_REQUEST, 'Login is occupied');
    const updatedUser = await this.userRepository.update(userBody);
    return User.toResponse(updatedUser);
  }

  deleteUser = async (userId: string): Promise<TUserToResponse> => {
    const deletedUser = await this.userRepository.delete(userId);
    const userTasks = await this.taskRepository.getAll('userId', userId);
    if (userTasks.length) {
      userTasks.forEach(async (task) => {
        const updatedTask = { ...task, userId: undefined };
        await this.taskRepository.update(updatedTask, task.boardId)
      })
    }
    return User.toResponse(deletedUser);
  }
}
