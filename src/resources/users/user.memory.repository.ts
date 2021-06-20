import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { User } from './';
import { database } from '../../database';
import { IRepository, TUserDTO } from '../../types';

const { NOT_FOUND } = StatusCodes;

export class UserMemoryRepository implements IRepository<User> {
  entities: User[];

  constructor() {
    this.entities = database.users;
  }

  getAll = async (): Promise<User[]> => this.entities;

  getById = async (userId: string): Promise<User> => {
    const foundedUser = this.entities.find((user) => user.id === userId);
    if (!foundedUser) throw newError(NOT_FOUND, 'No user matches this request');
    return foundedUser;
  }

  create = async (userBody: TUserDTO): Promise<User> => {
    const newUser = new User(userBody);
    this.entities.push(newUser);
    return newUser;
  }

  update = async (userBody: TUserDTO): Promise<User> => {
    const userId = userBody.id;
    const userToUpdate = this.entities.find((user) => user.id === userId);
    if (!userToUpdate) throw newError(NOT_FOUND, 'No user matches this request');
    const updatedUser = Object.assign(userToUpdate, userBody);
    return updatedUser;
  }

  delete = async (userId: string): Promise<User> => {
    const deletedUserIndex = this.entities.findIndex((user) => user.id === userId);
    if (deletedUserIndex === -1) throw newError(NOT_FOUND, 'No user matches this request');
    const deletedUser = this.entities.splice(deletedUserIndex, 1)[0]!;
    return deletedUser;
  }
}
