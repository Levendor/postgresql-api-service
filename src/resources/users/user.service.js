import { User } from './user.model.js';

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getAllUsers = async () => {
    const users = await this.userRepository.getAllUsers();
    return users.map(User.toResponse);
  };

  getUserById = async (userId) => {
    const user = await this.userRepository.getUserById(userId);
    return User.toResponse(user);
  }

  createUser = async (userBody) => {
    const users = await this.userRepository.getAllUsers();
    const isDuplicatedLogin = users.some((user) => user.login === userBody.login)
    if (isDuplicatedLogin) throw Error('Bad Request Error: login is occupied');
    const newUser = await this.userRepository.createUser(userBody);
    return User.toResponse(newUser);
  }

  updateUser = async (userBody) => {
    const users = await this.userRepository.getAllUsers();
    const isDuplicatedLogin = users.some((user) => user.login === userBody.login && user.id !== userBody.id);
    if (isDuplicatedLogin) throw Error('Bad Request Error: login is occupied');
    const updatedUser = await this.userRepository.updateUser(userBody);
    return User.toResponse(updatedUser);
  }

  deleteUser = async (userId) => {
    const deletedUser = await this.userRepository.deleteUser(userId);
    // TODO: delete all records of userId in assigned tasks
    return User.toResponse(deletedUser);
  }
}
