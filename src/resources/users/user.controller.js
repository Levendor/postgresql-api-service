import { errorLogger } from "../../loggers/index.js";

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      errorLogger(error);
      res.status(404).send(error.message);
      next();
    }
  }

  getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const foundedUser = await this.userService.getUserById(userId);
      res.json(foundedUser);
    } catch (error) {
      errorLogger(error);
      res.status(404).send(error.message);
      next();
    }
  }

  createUser = async (req, res, next) => {
    try {
      const userBody = req.body;
      const createdUser = await this.userService.createUser(userBody);
      res.status(201).json(createdUser);
    } catch (error) {
      errorLogger(error);
      res.status(404).send(error.message);
      next();
    }
  }

  updateUser = async (req, res, next) => {
    try {
      const userBody = { id: req.params.id, ...req.body };
      const updatedUser = await this.userService.updateUser(userBody);
      res.json(updatedUser);
    } catch (error) {
      errorLogger(error);
      res.status(404).send(error.message);
      next();
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const deletedUser = await this.userService.deleteUser(userId);
      res.status(204).json(deletedUser);
    } catch (error) {
      errorLogger(error);
      res.status(404).send(error.message);
      next();
    }
  }
}