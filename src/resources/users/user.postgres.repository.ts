import newError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../database/entities';
import { IRepository, TUserDTO } from '../../types';

const { NOT_FOUND } = StatusCodes;

export class UserPostgresRepository implements IRepository<User> {
  repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  getAll = async (): Promise<User[]> => {
    return this.repository.find();
  }

  getById = async (userId: string): Promise<User> => {
    const foundedUser = await this.repository.findOne(userId);
    if (!foundedUser) throw newError(NOT_FOUND, 'No user matches this request');
    return foundedUser;
  }

  create = async (userBody: TUserDTO): Promise<User> => {
    const newUser: User = this.repository.create({
      ...userBody,
    });
    await this.repository.insert(newUser);
    return newUser;
  }

  update = async (userBody: TUserDTO): Promise<User> => {
    const userToUpdate = await this.repository.findOne(userBody.id);
    if (!userToUpdate) throw newError(NOT_FOUND, 'No user matches this request');
    const updatedUser = await this.repository.save(userBody);
    return updatedUser;
  }

  delete = async (userId: string): Promise<User> => {
    const userToDelete = await this.repository.findOne(userId);
    if (!userToDelete) throw newError(NOT_FOUND, 'No user matches this request');
    return this.repository.remove(userToDelete);
  }
}
