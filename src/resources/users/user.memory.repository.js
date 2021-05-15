import { User } from './user.model.js';
import { database } from '../../database/index.js';

export class UserMemoryRepository {
  constructor() {
    this.users = database.users;
  }

  getAllUsers = async () => this.users;

  getUserById = async (userId) => {
    const foundedUser = this.users.find((user) => user.id === userId);
    if (!foundedUser) throw Error('Not Found Error: no user matches this request');
    return foundedUser;
  }

  createUser = async (userBody) => {
    const newUser = new User(userBody);
    this.users.push(newUser);
    return newUser;
  }

  updateUser = async (userBody) => {
    const userId = userBody.id;
    const updatedUserIndex = this.users.findIndex((user) => user.id === userId);
    if (updatedUserIndex === -1) throw Error('Not Found Error: no user matches this request');
    const updatedUser = { ...this.users[updatedUserIndex], ...userBody };
    this.users[updatedUserIndex] = updatedUser;
    return updatedUser;
  }

  deleteUser = async (userId) => {
    const deletedUserIndex = this.users.findIndex((user) => user.id === userId);
    if (deletedUserIndex === -1) throw Error('Not Found Error: no user matches this request');
    const deletedUser = { ...this.users[deletedUserIndex] };
    this.users.splice(deletedUserIndex, 1);
    return deletedUser;
  }
}
