import { User } from './user.model.js';

/**
 * A class to represent a service to operate with User repository
 * @class
 * @property {UserRepository} userRepository - an instance of User Repository
 * @property {TaskRepository} taskRepository - an instance of Task Repository
 */
export class UserService {
  constructor(userRepository, taskRepository) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  /**
   * Get list of all users
   * @async
   * @method
   * @returns {Promise<Array<omit<User, 'password'>>>} List of all users
   */
  getAllUsers = async () => {
    const users = await this.userRepository.getAllUsers();
    return users.map(User.toResponse);
  };

  /**
   * Get single user by its id
   * @async
   * @method
   * @param {string} userId - Id of requested user
   * @returns {Promise<Array<omit<User, 'password'>>>} Requested user object
   */
  getUserById = async (userId) => {
    const user = await this.userRepository.getUserById(userId);
    return User.toResponse(user);
  }

  /**
   * Create a new User in database
   * @async
   * @method
   * @param {Object.<User>} userBody - Object with User fields
   * @returns {Promise<Array<omit<User, 'password'>>>} New User object
   * @throws {BadRequestError} If login is occupied
   */
  createUser = async (userBody) => {
    const users = await this.userRepository.getAllUsers();
    const isDuplicatedLogin = users.some((user) => user.login === userBody.login)
    if (isDuplicatedLogin) throw Error('Bad Request Error: login is occupied');
    const newUser = await this.userRepository.createUser(userBody);
    return User.toResponse(newUser);
  }

  /**
   * Update an existed user in database by its id
   * @async
   * @method 
   * @param {Object.<User>} userBody - Object with some User fields
   * @returns {Promise<Array<omit<User, 'password'>>>} Updated User object
   * @throws {BadRequestError} If login is occupied
   */
  updateUser = async (userBody) => {
    const users = await this.userRepository.getAllUsers();
    const isDuplicatedLogin = users.some((user) => user.login === userBody.login && user.id !== userBody.id);
    if (isDuplicatedLogin) throw Error('Bad Request Error: login is occupied');
    const updatedUser = await this.userRepository.updateUser(userBody);
    return User.toResponse(updatedUser);
  }

  /**
   * Delete an existed user in database by its id and erase user record from assigned tasks
   * @async
   * @method
   * @param {string} userId - Id of user to delete
   * @returns {Promise<Array<omit<User, 'password'>>>} Deleted user object
   */
  deleteUser = async (userId) => {
    const deletedUser = await this.userRepository.deleteUser(userId);
    const userTasks = await this.taskRepository.getAllUserTasks(userId);
    if (userTasks.length) {
      userTasks.forEach(async (task) => {
        const updatedTask = { ...task, userId: null };
        await this.taskRepository.updateTask(task.boardId, updatedTask)
      })
    }
    return User.toResponse(deletedUser);
  }
}
