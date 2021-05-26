import { v4 as uuid } from 'uuid';

/**
 * User Entity
 * @class
 * @param {Object} userBody - An object with User fields
 * @param {string} userBody.id
 * @param {string} userBody.name
 * @param {string} userBody.login
 * @param {string} userBody.password
 * 
 * @property {string} id - UUID string
 * @property {string} name - User name
 * @property {string} login - User login
 * @property {string} password - User password
 */
export class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Function to provide a public view of User object
   * @static
   * @function
   * @param {User} user - User instance
   * @returns {omit<User, 'password'>}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
