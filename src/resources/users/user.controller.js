export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  getUserById = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const foundedUser = await this.userService.getUserById(userId);
      res.json(foundedUser);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  createUser = async (req, res, next) => {
    try {
      const userBody = req.body;
      const createdUser = await this.userService.createUser(userBody);
      res.status(201).json(createdUser);
    } catch (error) {
      error.statusCode = error.message.startsWith('Bad') ? 400 : 404;
      next(error);
    }
  }

  updateUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userBody = { userId, ...req.body };
      const updatedUser = await this.userService.updateUser(userBody);
      res.json(updatedUser);
    } catch (error) {
      error.statusCode = error.message.startsWith('Bad') ? 400 : 404;
      next(error);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const deletedUser = await this.userService.deleteUser(userId);
      res.status(204).json(deletedUser);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }
}