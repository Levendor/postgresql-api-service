import { User } from './user.model.js';
import { database } from '../../database/index.js';

/**
* A class to represent an in-memory repository of Users entity
* @class
* @property {User[]} users - An array of users
*/
export class UserMemoryRepository {
  constructor() {
    this.users = database.users;
  }

   /**
   * Get lists of all users
   * @async
   * @method
   * @returns {Promise<User[]>} List of all users
   */
  getAllUsers = async () => this.users;

  /**
   * Get single user by its id
   * @async
   * @method
   * @param {string} userId - Id of requested user
   * @returns {Promise<User>} Requested user instance
   * @throws {NotFoundError} If no user founded
   */
  getUserById = async (userId) => {
    const foundedUser = this.users.find((user) => user.id === userId);
    if (!foundedUser) throw Error('Not Found Error: no user matches this request');
    return foundedUser;
  }

  /**
   * Create a new User in database
   * @async
   * @method
   * @param {Object.<User>} userBody - Object with User fields
   * @returns {Promise<User>} New instance of User
   */
  createUser = async (userBody) => {
    const newUser = new User(userBody);
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Update an existed user in database by its id
   * @async
   * @method 
   * @param {Object.<User>} userBody - Object with some User fields
   * @returns {Promise<User>}
   * @throws {NotFoundError} If no user founded
   */
  updateUser = async (userBody) => {
    const userId = userBody.id;
    const updatedUserIndex = this.users.findIndex((user) => user.id === userId);
    if (updatedUserIndex === -1) throw Error('Not Found Error: no user matches this request');
    const updatedUser = { ...this.users[updatedUserIndex], ...userBody };
    this.users[updatedUserIndex] = updatedUser;
    return updatedUser;
  }

  /**
   * Delete an existed user in database by its id
   * @async
   * @method
   * @param {string} userId - Id of user to delete
   * @returns {Promise<User>}
   * @throws {NotFoundError} If no user founded
   */
  deleteUser = async (userId) => {
    const deletedUserIndex = this.users.findIndex((user) => user.id === userId);
    if (deletedUserIndex === -1) throw Error('Not Found Error: no user matches this request');
    const deletedUser = { ...this.users[deletedUserIndex] };
    this.users.splice(deletedUserIndex, 1);
    return deletedUser;
  }
}
