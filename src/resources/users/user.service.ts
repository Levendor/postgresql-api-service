import { IRepository, TUserBody, TUserToResponse } from '../../types/index.js';
import { TaskMemoryRepository } from '../tasks/task.memory.repository.js';
import { User } from './user.model.js';

export class UserService {
  userRepository: IRepository<User>;
  taskRepository: TaskMemoryRepository;

  constructor(userRepository: IRepository<User>, taskRepository: TaskMemoryRepository) {
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

  createUser = async (userBody: TUserBody): Promise<TUserToResponse> => {
    const users = await this.userRepository.getAll();
    const isDuplicatedLogin = users.some((user) => user.login === userBody.login)
    if (isDuplicatedLogin) throw Error('Bad Request Error: login is occupied');
    const newUser = await this.userRepository.create(userBody);
    return User.toResponse(newUser);
  }

  updateUser = async (userBody: TUserBody): Promise<TUserToResponse> => {
    const users = await this.userRepository.getAll();
    const isDuplicatedLogin = users.some((user) => user.login === userBody.login && user.id !== userBody.id);
    if (isDuplicatedLogin) throw Error('Bad Request Error: login is occupied');
    const updatedUser = await this.userRepository.update(userBody);
    return User.toResponse(updatedUser);
  }

  deleteUser = async (userId: string): Promise<TUserToResponse> => {
    const deletedUser = await this.userRepository.delete(userId);
    const userTasks = await this.taskRepository.getAll('userId', userId);
    if (userTasks.length) {
      userTasks.forEach(async (task) => {
        const updatedTask = { userId: null };
        await this.taskRepository.update(updatedTask, task.boardId)
      })
    }
    return User.toResponse(deletedUser);
  }
}
