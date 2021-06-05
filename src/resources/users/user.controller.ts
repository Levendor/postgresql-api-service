import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!userId) return next(new Error('Bad Request Error: no boardId is provided'));
      const foundedUser = await this.userService.getUserById(userId);
      res.json(foundedUser);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userBody = req.body;
      const createdUser = await this.userService.createUser(userBody);
      res.status(201).json(createdUser);
    } catch (error) {
      error.statusCode = error.message.startsWith('Bad') ? 400 : 404;
      next(error);
    }
  }

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!userId) return next(new Error('Bad Request Error: no boardId is provided'));
      const userBody = { userId, ...req.body };
      const updatedUser = await this.userService.updateUser(userBody);
      res.json(updatedUser);
    } catch (error) {
      error.statusCode = error.message.startsWith('Bad') ? 400 : 404;
      next(error);
    }
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!userId) return next(new Error('Bad Request Error: no boardId is provided'));
      const deletedUser = await this.userService.deleteUser(userId);
      res.status(204).json(deletedUser);
    } catch (error) {
      error.statusCode = 404;
      next(error);
    }
  }
}